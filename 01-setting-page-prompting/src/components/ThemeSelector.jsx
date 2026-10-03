import React from "react";

function ThemeSelector({ value, onChange }) {
  const options = [
    { id: "theme-light", value: "light", label: "Light" },
    { id: "theme-dark", value: "dark", label: "Dark" },
  ];

  return (
    <fieldset className="field">
      <legend className="field-label">Theme</legend>
      <div className="radio-group" role="radiogroup" aria-label="Theme">
        {options.map((option) => (
          <label key={option.id} htmlFor={option.id} className="radio-option">
            <input
              type="radio"
              id={option.id}
              name="theme"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default ThemeSelector;
