import React, { useState, useEffect } from "react";
import TextField from "./TextField";
import ThemeSelector from "./ThemeSelector";
import ToggleSwitch from "./ToggleSwitch";
import "./UserSettingsPage.css";

// Simple, pragmatic email pattern: something@something.tld
// validation, with the server remaining the source of truth.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Letters (incl. accented), spaces, hyphens, and apostrophes only —
// rejecting digits and other special characters.
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  theme: "light",
  notificationsEnabled: true,
};

function validate(values) {
  const errors = {};

  const trimmedName = values.fullName.trim();
  if (!trimmedName) {
    errors.fullName = "Full name is required.";
  } else if (!NAME_PATTERN.test(trimmedName)) {
    errors.fullName =
      "Full name can only contain letters, spaces, hyphens, and apostrophes.";
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Enter a valid email address, e.g. name@example.com.";
  }

  return errors;
}

function UserSettingsPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", values.theme);
  }, [values.theme]);

  const updateField = (field, fieldValue) => {
    setValues((prev) => ({ ...prev, [field]: fieldValue }));
    if (saveState === "success") {
      setSaveState("idle");
    }
    if (touched[field]) {
      const nextErrors = validate({ ...values, [field]: fieldValue });
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true });

    const isValid = Object.keys(nextErrors).length === 0;
    if (!isValid) {
      setSaveState("idle");
      return;
    }

    // Stand-in for a real persistence call (API request, context/store
    // update, etc.). Theme and notifications already live in this
    // component's state, so "updating application state" happens as
    // soon as the controls change — this is the point where you'd
    // sync that state to a backend or global store.
    // eslint-disable-next-line no-console
    console.log("Saving settings:", values);

    setSaveState("success");
  };

  return (
    <div className="page-shell">
      <div className="settings-card">
        <div className="settings-header">
          <span className="settings-icon" aria-hidden="true">
            ⚙️
          </span>
          <div>
            <h1 className="settings-title">User Settings</h1>
            <p className="settings-subtitle">
              Manage your profile and preferences
            </p>
          </div>
        </div>

        <form className="settings-form" onSubmit={handleSubmit} noValidate>
          <TextField
            id="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            error={touched.fullName ? errors.fullName : undefined}
            required
            placeholder="Jane Doe"
            autoComplete="name"
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={touched.email ? errors.email : undefined}
            required
            placeholder="jane@example.com"
            autoComplete="email"
          />

          <ThemeSelector
            value={values.theme}
            onChange={(theme) => updateField("theme", theme)}
          />

          <ToggleSwitch
            id="notifications"
            label="Enable Notifications"
            checked={values.notificationsEnabled}
            onChange={(checked) => updateField("notificationsEnabled", checked)}
          />

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Settings
            </button>
          </div>

          {saveState === "success" && (
            <p className="success-message" role="status">
              <span aria-hidden="true">✓</span> Settings saved successfully.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserSettingsPage;
