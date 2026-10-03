import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../utils/placeholderImage";

// Swap in the placeholder once if an image fails to load.
function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = PLACEHOLDER_IMAGE;
}

export default function MyPlan({ workout, onRemove }) {
  const count = workout.length;

  return (
    <section>
      <Link to="/exercises" className="back-link">
        ← Back to Exercises
      </Link>

      <h1>My Workout</h1>
      <p className="page-subtitle">
        The exercises you’ve added to your workout.
      </p>

      <p className="result-count" aria-live="polite">
        {count === 1 ? "1 exercise" : `${count} exercises`}
      </p>

      {count === 0 ? (
        <div className="status status--empty">
          <div>
            <h2 className="status__title">Your workout is empty</h2>
            <p>
              Browse the exercise library and add exercises to build your
              workout.
            </p>
            <Link to="/exercises" className="btn">
              Browse Exercises
            </Link>
          </div>
        </div>
      ) : (
        <div className="exercise-grid">
          {workout.map((exercise) => (
            <article key={exercise.id} className="exercise-card">
              <img
                className="exercise-card__image"
                src={exercise.image}
                alt={exercise.name}
                loading="lazy"
                onError={handleImageError}
              />

              <div className="exercise-card__body">
                <h2 className="exercise-card__title">{exercise.name}</h2>

                <dl className="exercise-card__meta">
                  <div>
                    <dt>Target</dt>
                    <dd>{exercise.targetMuscle}</dd>
                  </div>
                  <div>
                    <dt>Equipment</dt>
                    <dd>{exercise.equipment}</dd>
                  </div>
                  <div>
                    <dt>Difficulty</dt>
                    <dd>
                      <span
                        className={`badge badge--${exercise.difficulty.toLowerCase()}`}
                      >
                        {exercise.difficulty}
                      </span>
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => onRemove(exercise.id)}
                  aria-label={`Remove ${exercise.name} from workout`}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
