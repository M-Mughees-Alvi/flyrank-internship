import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../utils/placeholderImage";

export default function ExerciseCard({
  exercise,
  isInWorkout = false,
  onAddToWorkout,
}) {
  const { id, name, targetMuscle, equipment, difficulty, image } = exercise;

  // If the image URL fails, swap in the placeholder once.
  // Clearing onerror prevents an infinite loop if the placeholder ever failed.
  function handleImageError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = PLACEHOLDER_IMAGE;
  }

  return (
    <article className="exercise-card">
      <img
        className="exercise-card__image"
        src={image}
        alt={name}
        loading="lazy"
        onError={handleImageError}
      />

      <div className="exercise-card__body">
        <h2 className="exercise-card__title">{name}</h2>

        <dl className="exercise-card__meta">
          <div>
            <dt>Target</dt>
            <dd>{targetMuscle}</dd>
          </div>
          <div>
            <dt>Equipment</dt>
            <dd>{equipment}</dd>
          </div>
          <div>
            <dt>Difficulty</dt>
            <dd>
              <span className={`badge badge--${difficulty.toLowerCase()}`}>
                {difficulty}
              </span>
            </dd>
          </div>
        </dl>

        <div className="exercise-card__actions">
          <Link
            to={`/exercises/${encodeURIComponent(id)}`}
            className="btn"
            aria-label={`View details for ${name}`}
          >
            View Details
          </Link>

          {isInWorkout ? (
            <button type="button" className="btn btn--added" disabled>
              ✓ In Workout
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onAddToWorkout(exercise)}
              aria-label={`Add to Workout: ${name}`}
            >
              Add to Workout
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
