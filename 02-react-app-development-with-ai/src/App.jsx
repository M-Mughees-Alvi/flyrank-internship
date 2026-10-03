import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseDetails from "./pages/ExerciseDetails";
import MyPlan from "./pages/MyPlan";

export default function App() {
  // The workout lives here, above all routes, so it survives navigation.
  // Items are stored in the order they were added.
  const [workout, setWorkout] = useState([]);

  function isInWorkout(id) {
    return workout.some((item) => item.id === id);
  }

  function addToWorkout(exercise) {
    // Keep only the fields the cards show, so items look the same
    // whether they were added from the list or the details page.
    const { id, name, targetMuscle, equipment, difficulty, image } = exercise;

    // The duplicate check is inside the updater so it always runs against
    // the latest state, even if two clicks happen before a re-render.
    setWorkout((current) =>
      current.some((item) => item.id === id)
        ? current
        : [
            ...current,
            { id, name, targetMuscle, equipment, difficulty, image },
          ],
    );
  }

  function removeFromWorkout(id) {
    setWorkout((current) => current.filter((item) => item.id !== id));
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/exercises"
          element={
            <Exercises
              isInWorkout={isInWorkout}
              onAddToWorkout={addToWorkout}
            />
          }
        />
        <Route
          path="/exercises/:id"
          element={
            <ExerciseDetails
              isInWorkout={isInWorkout}
              onAddToWorkout={addToWorkout}
            />
          }
        />
        <Route
          path="/my-plan"
          element={<MyPlan workout={workout} onRemove={removeFromWorkout} />}
        />
      </Route>
    </Routes>
  );
}
