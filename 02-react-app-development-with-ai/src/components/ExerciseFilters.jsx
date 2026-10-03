// A "controlled" form section: it holds no state of its own.
// The parent passes in the current values and receives changes via callbacks.

function FilterSelect({ id, name, label, value, options, onChange }) {
  return (
    <div className="filters__field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.name, event.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ExerciseFilters({
  filters,
  options,
  hasActiveFilters,
  onChange,
  onClear,
}) {
  return (
    <div className="filters">
      <div className="filters__field filters__field--search">
        <label htmlFor="exercise-search">Search</label>
        <input
          id="exercise-search"
          type="search"
          name="search"
          placeholder="Search exercises by name…"
          value={filters.search}
          onChange={(event) => onChange(event.target.name, event.target.value)}
        />
      </div>

      <FilterSelect
        id="filter-muscle"
        name="muscle"
        label="Target muscle"
        value={filters.muscle}
        options={options.muscles}
        onChange={onChange}
      />
      <FilterSelect
        id="filter-equipment"
        name="equipment"
        label="Equipment"
        value={filters.equipment}
        options={options.equipment}
        onChange={onChange}
      />
      <FilterSelect
        id="filter-difficulty"
        name="difficulty"
        label="Difficulty"
        value={filters.difficulty}
        options={options.difficulties}
        onChange={onChange}
      />

      <button
        type="button"
        className="btn btn--secondary"
        onClick={onClear}
        disabled={!hasActiveFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
