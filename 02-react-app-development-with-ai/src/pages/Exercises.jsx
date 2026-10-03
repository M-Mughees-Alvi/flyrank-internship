import { useEffect, useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseFilters from "../components/ExerciseFilters";
import Pagination from "../components/Pagination"; // NEW
import { fetchExercises } from "../services/exerciseApi";

// "" means "All" for the dropdowns and "no search text" for the search box.
const EMPTY_FILTERS = { search: "", muscle: "", equipment: "", difficulty: "" };

// Display order for difficulty (alphabetical order would put Advanced first).
const DIFFICULTY_ORDER = ["Beginner", "Intermediate", "Advanced"];

const ITEMS_PER_PAGE = 24; // NEW

// Unique, sorted values of one field across all exercises.
function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort();
}

export default function Exercises({ isInWorkout, onAddToWorkout }) {
  // --- Stage 3 state (unchanged) ---
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Stage 4 state: what the user has typed/selected ---
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // --- Stage 5 state: which page of the filtered results is showing --- // NEW
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await fetchExercises({ signal: controller.signal });
        setExercises(data);
      } catch (err) {
        // An abort means the component unmounted; nothing to show.
        if (err.name === "AbortError") return;
        setError(
          err.message || "Something went wrong while loading exercises.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    // Cancel the in-flight request if the user leaves the page.
    return () => controller.abort();
  }, []);

  // Update one filter field, keeping the others as they are.
  function handleFilterChange(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
    setCurrentPage(1); // NEW: any search/filter change returns to page 1
  }

  function handleClearFilters() {
    setFilters(EMPTY_FILTERS);
    setCurrentPage(1); // NEW
  }

  // NEW: change page and bring the user back to the top of the results.
  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Derived data: recalculated on every render, never stored in state ---

  // Dropdown options come from the loaded data.
  const options = {
    muscles: getUniqueValues(exercises, "targetMuscle"),
    equipment: getUniqueValues(exercises, "equipment"),
    difficulties: DIFFICULTY_ORDER.filter((level) =>
      exercises.some((exercise) => exercise.difficulty === level),
    ),
  };

  const searchQuery = filters.search.trim().toLowerCase();

  // .filter() returns a NEW array; `exercises` itself is never changed.
  const filteredExercises = exercises.filter((exercise) => {
    // includes('') is true, so an empty search matches everything.
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery);
    const matchesMuscle =
      !filters.muscle || exercise.targetMuscle === filters.muscle;
    const matchesEquipment =
      !filters.equipment || exercise.equipment === filters.equipment;
    const matchesDifficulty =
      !filters.difficulty || exercise.difficulty === filters.difficulty;

    return (
      matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty
    );
  });

  const hasActiveFilters =
    searchQuery !== "" ||
    filters.muscle !== "" ||
    filters.equipment !== "" ||
    filters.difficulty !== "";

  const count = filteredExercises.length;
  const countText =
    count === 0
      ? "No exercises found"
      : `${count} ${count === 1 ? "exercise" : "exercises"}`;

  // NEW: pagination, applied AFTER filtering.
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  // Safety net: never use a page number outside 1..totalPages.
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageExercises = filteredExercises.slice(startIndex, endIndex);

  let content;

  if (loading) {
    content = (
      <div className="status status--loading" role="status">
        <span className="spinner" aria-hidden="true" />
        Loading exercises…
      </div>
    );
  } else if (error) {
    content = (
      <div className="status status--error" role="alert">
        {error}
      </div>
    );
  } else if (exercises.length === 0) {
    // The API returned no data at all (no controls to show).
    content = <div className="status">No exercises found.</div>;
  } else {
    // Data loaded: show controls, count, then either results or a no-match message.
    content = (
      <>
        <ExerciseFilters
          filters={filters}
          options={options}
          hasActiveFilters={hasActiveFilters}
          onChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        <p className="result-count" aria-live="polite">
          {countText}
        </p>

        {count === 0 ? (
          // Data exists, but nothing matches the current search/filters.
          <div className="status">
            No exercises match your search and filters.
          </div>
        ) : (
          <>
            <div className="exercise-grid">
              {/* CHANGED: render only the current page */}
              {pageExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isInWorkout={isInWorkout(exercise.id)}
                  onAddToWorkout={onAddToWorkout}
                />
              ))}
            </div>

            {/* NEW: only rendered when there are matches */}
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              rangeStart={startIndex + 1}
              rangeEnd={Math.min(endIndex, count)}
              totalItems={count}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </>
    );
  }

  return (
    <section>
      <h1>Exercises</h1>
      <p className="page-subtitle">
        Browse exercises by target muscle, equipment, and difficulty.
      </p>
      {content}
    </section>
  );
}
