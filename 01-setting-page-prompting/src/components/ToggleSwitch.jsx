import React from "react";

function ToggleSwitch({ id, label, checked, onChange }) {
  return (
    <div className="field field--row">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        className={`switch${checked ? " switch--on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" aria-hidden="true" />
        <span className="sr-only">{checked ? "Enabled" : "Disabled"}</span>
      </button>
    </div>
  );
}

export default ToggleSwitch;
