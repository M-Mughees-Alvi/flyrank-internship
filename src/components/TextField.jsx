import React from "react";

/**
 * Reusable labeled text input with inline validation error support.
 *
 * Accessibility notes:
 * - <label htmlFor> is explicitly tied to the input's id.
 * - aria-invalid reflects validation state for assistive tech.
 * - aria-describedby points at the error message so screen readers
 *   announce it when the field is invalid.
 * - The error message has role="alert" so it's announced when it appears.
 */
function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  autoComplete,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="required-indicator" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`field-input${error ? " field-input--error" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextField;
