import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchExerciseById } from "../services/exerciseApi";
import { PLACEHOLDER_IMAGE } from "../utils/placeholderImage";

// Swap in the placeholder once if an image fails to load.
function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = PLACEHOLDER_IMAGE;
}

export default function ExerciseDetails({ isInWorkout, onAddToWorkout }) {
  const { id } = useParams();

  // The result remembers which id it belongs to. "Loading" is then simply
  // "we don't have a result for the current id yet", so a changed id can
  // never show the previous exercise's data.
  const [result, setResult] = useState({
    id: null,
    exercise: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const exercise = await fetchExerciseById(id, {
          signal: controller.signal,
        });
        setResult({ id, exercise, error: null });
      } catch (err) {
        // An abort means the user left the page; nothing to show.
        if (err.name === "AbortError") return;
        setResult({
          id,
          exercise: null,
          error:
            err.message || "Something went wrong while loading this exercise.",
        });
      }
    }

    load();

    // Cancel the in-flight request if the user leaves or the id changes.
    return () => controller.abort();
  }, [id]);

  const loading = result.id !== id;
  const { exercise, error } = result;

  let content;

  if (loading) {
    content = (
      <div className="status status--loading" role="status">
        <span className="spinner" aria-hidden="true" />
        Loading exercise…
      </div>
    );
  } else if (error) {
    content = (
      <div className="status status--error" role="alert">
        {error}
      </div>
    );
  } else if (!exercise) {
    // The request worked, but no exercise has this id.
    content = (
      <div className="status">
        <div>
          <h1 className="details__notfound-title">Exercise not found</h1>
          <p>We couldn’t find an exercise with that ID.</p>
        </div>
      </div>
    );
  } else {
    // If the exercise has no images, show its single placeholder image.
    const images =
      exercise.images.length > 0 ? exercise.images : [exercise.image];
    const added = isInWorkout(exercise.id);

    content = (
      <article className="details">
        <header className="details__header">
          <h1>{exercise.name}</h1>
          <span className={`badge badge--${exercise.difficulty.toLowerCase()}`}>
            {exercise.difficulty}
          </span>
        </header>
        <div className="details__actions">
          {added ? (
            <button type="button" className="btn btn--added" disabled>
              ✓ In Workout
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              onClick={() => onAddToWorkout(exercise)}
            >
              Add to Workout
            </button>
          )}

          {/* Always rendered so screen readers announce the change when it appears. */}
          <p className="details__added-note" role="status">
            {added && (
              <>
                ✓ In your workout. <Link to="/my-plan">View My Workout</Link>
              </>
            )}
          </p>
        </div>

        <div className="details__layout">
          <div className="details__images">
            {images.map((src, index) => (
              <img
                key={src}
                className="details__image"
                src={src}
                alt={
                  images.length > 1
                    ? `${exercise.name}, image ${index + 1} of ${images.length}`
                    : exercise.name
                }
                onError={handleImageError}
              />
            ))}
          </div>

          <dl className="details__facts">
            <div>
              <dt>Target muscle</dt>
              <dd>{exercise.targetMuscle}</dd>
            </div>
            {exercise.secondaryMuscles.length > 0 && (
              <div>
                <dt>Secondary muscles</dt>
                <dd>{exercise.secondaryMuscles.join(", ")}</dd>
              </div>
            )}
            <div>
              <dt>Equipment</dt>
              <dd>{exercise.equipment}</dd>
            </div>
            {exercise.category && (
              <div>
                <dt>Category</dt>
                <dd>{exercise.category}</dd>
              </div>
            )}
            {exercise.force && (
              <div>
                <dt>Force</dt>
                <dd>{exercise.force}</dd>
              </div>
            )}
            {exercise.mechanic && (
              <div>
                <dt>Mechanic</dt>
                <dd>{exercise.mechanic}</dd>
              </div>
            )}
          </dl>
        </div>

        <section className="details__instructions">
          <h2>Instructions</h2>
          {exercise.instructions.length > 0 ? (
            <ol>
              {exercise.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="details__muted">
              No instructions are available for this exercise.
            </p>
          )}
        </section>
      </article>
    );
  }

  return (
    <section>
      <Link to="/exercises" className="back-link">
        ← Back to Exercises
      </Link>
      {content}
    </section>
  );
}
