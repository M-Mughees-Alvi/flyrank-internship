import { PLACEHOLDER_IMAGE } from "../utils/placeholderImage";

const DATA_URL =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json";
const IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";
// NEW: images and per-exercise JSON files live in the same folder:
// exercises/Air_Bike.json and exercises/Air_Bike/0.jpg
const EXERCISE_JSON_BASE_URL = IMAGE_BASE_URL;

// Map API levels to the labels the card's badge styles expect.
const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  expert: "Advanced",
};

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Converts one raw API object into the shape ExerciseCard expects.
function normalizeExercise(raw) {
  const muscles = Array.isArray(raw.primaryMuscles) ? raw.primaryMuscles : [];
  const firstImage = Array.isArray(raw.images) ? raw.images[0] : null;

  return {
    id: raw.id,
    name: raw.name,
    targetMuscle: muscles.length
      ? capitalizeWords(muscles.join(", "))
      : "Various",
    equipment: raw.equipment ? capitalizeWords(raw.equipment) : "None",
    difficulty: LEVEL_LABELS[raw.level] ?? "Beginner",
    image: firstImage ? `${IMAGE_BASE_URL}${firstImage}` : PLACEHOLDER_IMAGE,
  };
}

// NEW: the card fields plus the extra detail fields. Absent values become
// empty arrays or null so the page can simply skip them.
function normalizeExerciseDetails(raw) {
  const secondary = Array.isArray(raw.secondaryMuscles)
    ? raw.secondaryMuscles
    : [];
  const images = Array.isArray(raw.images) ? raw.images : [];

  return {
    ...normalizeExercise(raw),
    secondaryMuscles: secondary.map(capitalizeWords),
    instructions: Array.isArray(raw.instructions) ? raw.instructions : [],
    category: raw.category ? capitalizeWords(raw.category) : null,
    force: raw.force ? capitalizeWords(raw.force) : null,
    mechanic: raw.mechanic ? capitalizeWords(raw.mechanic) : null,
    images: images.map((path) => `${IMAGE_BASE_URL}${path}`),
  };
}

export async function fetchExercises({ signal } = {}) {
  const response = await fetch(DATA_URL, { signal });

  if (!response.ok) {
    throw new Error(`Could not load exercises (HTTP ${response.status}).`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Received an unexpected response from the exercise API.");
  }

  return data.map(normalizeExercise);
}

// NEW: fetch one exercise by id.
// Resolves to the exercise, or to null if it doesn't exist ("not found").
// Throws only for real failures (network problem, server error).
export async function fetchExerciseById(id, { signal } = {}) {
  // All real ids contain only letters, digits, "_" and "-". Anything else
  // can't exist, so skip the request.
  if (!/^[\w-]+$/.test(id)) return null;

  const response = await fetch(
    `${EXERCISE_JSON_BASE_URL}${encodeURIComponent(id)}.json`,
    { signal },
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Could not load this exercise (HTTP ${response.status}).`);
  }

  const data = await response.json();

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Received an unexpected response from the exercise API.");
  }

  return normalizeExerciseDetails(data);
}
