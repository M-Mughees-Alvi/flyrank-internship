// Presentational component: it shows the page info and reports clicks.
// The parent owns the page number.

export default function Pagination({
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  totalItems,
  onPageChange,
}) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <p className="pagination__info">
        Showing {rangeStart}–{rangeEnd} of {totalItems}{" "}
        {totalItems === 1 ? "exercise" : "exercises"}
      </p>

      <div className="pagination__controls">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>

        <span className="pagination__page">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
