# AI Development Log — FitPlanner

## Overview

FitPlanner was developed as a staged React application using Claude as an AI development assistant.

The application was intentionally developed incrementally. Each stage had a specific scope, implementation requirements, testing process, and validation before moving to the next stage.

The development workflow was:

```text
Plan stage
    ↓
Write focused AI prompt
    ↓
Review AI explanation
    ↓
Implement
    ↓
Run application
    ↓
Human testing
    ↓
Identify issues if any
    ↓
AI-assisted debugging/correction
    ↓
Verify result
    ↓
Move to next stage

```

## AI Tool

**Claude**

Claude was used for:

- React implementation
- Architecture suggestions
- Component creation
- Routing
- API/data integration
- State management
- Debugging
- Targeted corrections
- Technical explanations

The application was not generated through one large prompt. It was developed through six focused implementation stages.

---

# Stage 1 — Project Foundation

## Objective

Create the initial React application shell without API functionality.

## Actual Prompt

> I'm building a React fitness planner using Vite.
>
> I want to start with a simple application shell containing:
>
> - Navbar
> - Home page
> - Exercise page
> - My Plan page
>
> Don't implement API functionality yet.
>
> First explain the component structure you recommend and why.  
> Then provide the implementation.

## AI Contribution

Claude:

- Created the React/Vite project structure
- Configured React Router
- Added the shared Layout component
- Added the Navbar
- Added Home, Exercises, and My Plan pages
- Added initial global CSS

## Human Review

The generated architecture and implementation were reviewed.

The application was run locally and the routing and pages were verified.

### Result

The implementation worked correctly.

**Manual code corrections:** None.

---

# Stage 2 — Exercise Explorer UI

## Objective

Create a reusable exercise-card interface using temporary local data before introducing real API data.

## Actual Prompt

```text
We have completed the initial FitPlanner application shell and routing.

Now implement Stage 2: the Exercise Explorer UI using temporary hardcoded data only.

Requirements:

1. Create a reusable ExerciseCard component in src/components/ExerciseCard.jsx.

2. Update the Exercises page so it displays a responsive grid of exercise cards.

3. For now, use a small hardcoded array of exercise objects inside Exercises.jsx. Do NOT connect any external API yet.

4. Each exercise object should contain:
   - id
   - name
   - target muscle
   - equipment
   - difficulty
   - a suitable image URL or placeholder image

5. Each ExerciseCard should display:
   - exercise image
   - exercise name
   - target muscle
   - equipment
   - difficulty
   - a "View Details" button

6. Keep the component reusable. ExerciseCard should receive exercise data through props rather than containing the exercise data itself.

7. Do not implement routing to an exercise details page yet. The "View Details" button can be non-functional for now.

8. Add appropriate CSS for:
   - responsive card grid
   - card layout
   - image sizing
   - readable typography
   - button styling
   - hover interaction

9. Keep the existing Navbar, Layout, Home page, and My Plan page working exactly as they currently do.

10. Do not introduce Context, Redux, Zustand, or any other state-management library.

11. Do not add an API, fetch(), useEffect(), or external data fetching yet.

12. Keep the implementation simple and appropriate for a small React project.

Before writing the code, briefly explain the component/data-flow approach you are using. Then provide the files that need to be created or modified.

```

## AI Contribution

Claude created:

- `ExerciseCard`
- Exercise data structure
- Responsive card layout
- Metadata display
- Difficulty display
- Styling

## Human Review

The component/data-flow approach was reviewed.

The application was run and the cards were manually verified.

### Result

The cards rendered correctly and the UI behaved as expected.

**Manual code corrections:** None.

---

# Stage 3 — Real Exercise Data Integration

## Objective

Replace the temporary hardcoded exercise data with a real public exercise dataset.

## Actual Prompt

The Stage 3 implementation prompt requested:

- Selection of a suitable public exercise API/dataset
- Explanation of the selected data source
- A separate exercise API/service module
- Fetching exercises when the page loads
- Loading state
- Error state
- Empty state
- Response normalization
- Exercise image handling
- Request cleanup with `AbortController`
- Preservation of the existing ExerciseCard
- No search, filtering, pagination, Context, Redux, or `useReducer`

The original prompt was supplied during development and should be retained with the assignment evidence.

> **Note:** The original Stage 3 prompt available in the development record is truncated at its final requirement. The missing text should not be reconstructed or invented.

## AI Contribution

Claude integrated the exercise dataset and implemented:

- Exercise data service
- Data fetching
- Loading state
- Error state
- Empty state
- Data normalization
- AbortController cleanup
- Exercise images
- Image fallback behavior

## Issue Discovered During Human Testing

The exercise data loaded successfully, but exercise images were displaying the fallback image.

The application was manually inspected using Chrome DevTools.

An example failed request was:

```text
https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/Adductor_Groin/0.jpg

```

The request returned:

```text
404 Not Found

```

This established that the data-fetching logic was working and the problem was specifically the image URL construction.

## AI-Assisted Debugging Prompt

```text
We found the exact issue with the exercise images.
The exercise data loads correctly, but the image requests return 404.
For example, the browser requests:
https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/Adductor_Groin/0.jpg
and DevTools shows:

* Request method: GET
* Status: 404 Not Found

So the problem is specifically the image URL construction, not the API data fetching, loading state, or React rendering.
Before changing the code:

1. Inspect the actual structure/format of the `images` field returned by the free-exercise-db dataset.
2. Verify what the correct publicly accessible image path should be.
3. Explain why the current `IMAGE_BASE_URL + raw.images[0]` construction produces a 404.
4. Then make the smallest necessary correction to `src/services/exerciseApi.js` so that valid exercise images load.
5. Keep the existing fallback image behavior for missing/broken images.
6. Do not change the exercise data fetching, loading/error states, card layout, routing, or unrelated files.
7. Do not introduce search, filtering, pagination, Context, Redux, useReducer, or any other Stage 4+ functionality.

After implementing the fix, explain exactly what was changed and why.
I will manually test several exercise images in the browser afterward.

```

## Human Investigation

Chrome DevTools → Network → Img was used to inspect the failed image requests.

The 404 response confirmed that the generated image path was invalid.

## AI-Assisted Correction

Claude identified that the image base path incorrectly included:

```text
/dist/exercises/

```

The path was corrected to use:

```text
/exercises/

```

## Verification

Multiple exercise image requests were manually tested.

The tested image requests returned:

```text
200 OK

```

and the images displayed correctly.

### Important Classification

This was a **human-discovered, AI-assisted debugging issue**.

The human contribution was:

- Testing
- DevTools investigation
- Identifying the 404 behavior
- Providing the concrete evidence to Claude

Claude performed the actual code correction.

---

# Stage 4 — Search, Filtering & Pagination

## Objective

Allow users to search and filter the loaded exercise dataset and then paginate the filtered results.

## Prompt 1 — Search & Filtering

The actual prompt instructed Claude to implement:

- Name search
- Case-insensitive partial matching
- Target muscle filter
- Equipment filter
- Difficulty filter
- Combined filtering
- Clear Filters
- Result count
- Separate no-match state
- Preservation of Stage 3 behavior
- Client-side filtering
- No Context, Redux, `useReducer`, pagination, backend, or database

The prompt explicitly required the original fetched `exercises` array to remain unchanged and the filtered results to be derived from it.

## AI Contribution

Claude created:

- `ExerciseFilters`
- Search state
- Filter state
- Derived filtered exercise list
- Dynamic filter options
- Combined filtering
- Clear Filters behavior
- Result count
- No-match state

## Human Testing

The following behaviors were manually tested:

### Initial dataset

```text
24 exercises displayed
Page 1 of 37

```

### Pagination

The next page displayed different exercises.

### Last page

The final page displayed:

```text
865–876

```

with 12 exercises.

### Search

Searching:

```text
squat

```

reset the page to page 1 and displayed the matching results.

### Combined filtering

Search and target-muscle filtering worked together.

### No-match state

Searching:

```text
zzz

```

produced no cards and no pagination controls.

### Clear Filters

Clear Filters restored the full dataset and returned pagination to page 1.

---

## Prompt 2 — Pagination

The second Stage 4 prompt requested:

- Keep all 876 exercises loaded
- Search/filter first
- Pagination second
- 24 exercises per page
- Previous/Next controls
- Page count
- Optional result range
- Disabled pagination boundaries
- No pagination when there are no results
- Page reset after search/filter changes
- Clear Filters resets page
- Protection against invalid pages
- Search text must remain active when filters change

The intended data flow was explicitly:

```text
876 exercises
→ search/filter
→ filtered results
→ pagination
→ displayed cards

```

## AI Contribution

Claude implemented the pagination behavior while preserving the existing search/filter architecture.

## Human Verification

All required search, filter, pagination, reset, and boundary behaviors were tested manually.

### Result

Stage 4 functionality worked correctly.

**Manual code corrections:** None required after implementation.

---

# Stage 5 — Exercise Details

## Objective

Turn the existing "View Details" control into a dynamic exercise details page.

## Actual Prompt

The Stage 5 prompt instructed Claude to:

- Add `/exercises/:id`
- Create an ExerciseDetails page/component
- Navigate using the existing exercise ID
- Display exercise-specific information
- Reuse existing API/service logic
- Handle invalid IDs
- Handle loading/error states
- Preserve image fallback behavior
- Add a Back to Exercises control
- Preserve search, filtering, pagination, and existing API integration
- Use plain CSS
- Avoid Context, Redux, `useReducer`, backend, database, authentication, and unrelated features

The prompt also required Claude to explain the implementation before coding and summarize the changes afterward.

## AI Contribution

Claude implemented:

- Dynamic route
- Exercise Details page
- Exercise ID handling
- Single-exercise data retrieval
- Exercise metadata
- Instructions
- Image display
- Loading/error states
- Invalid ID handling
- Back navigation

## Human Testing

The details functionality was manually tested using the Exercise Explorer.

Valid exercise IDs were tested, and the details page displayed the corresponding exercise information.

Invalid/unknown IDs were also handled appropriately.

### Result

Stage 5 worked correctly.

**Manual code corrections:** None required.

---

# Stage 6 — My Workout

## Objective

Turn the My Plan placeholder into a functional workout-planning feature.

## Prompt 1 — My Workout Implementation

The actual Stage 6 prompt required:

- Add exercises from Exercise Explorer
- Add exercises from Exercise Details
- Store workout in React application state
- Make the workout available across relevant pages
- Display selected exercises
- Remove exercises
- Prevent duplicates
- Show workout count
- Provide an empty state
- Preserve all Stage 1–5 functionality
- Avoid Redux, Zustand, Context unless genuinely necessary
- Avoid localStorage/backend/database
- Reuse existing exercise data
- Avoid refetching the complete dataset
- Add Workout controls to ExerciseCard and ExerciseDetails
- Preserve `/my-plan`
- Use plain CSS

Claude first explained the state-management approach before implementing it.

## AI Contribution

Claude implemented application-level workout state and passed the required data/functions through the relevant components.

The implementation included:

- Workout state
- Add functionality
- Remove functionality
- Duplicate prevention
- Workout count
- Empty state
- Exercise Explorer integration
- Exercise Details integration
- My Workout display

## Human Testing

The complete Stage 6 behavior was tested.

Most functionality worked correctly:

- Adding from Details
- Duplicate prevention
- Removing exercises
- My Workout page
- Workout state
- Workout display

However, one specific issue was discovered.

---

# Stage 6 Debugging — Exercise Explorer Add Button

## Bug Discovered

Adding an exercise from the Exercise Details page worked, but adding an exercise directly from the Exercise Explorer did not.

Expected behavior:

```text
Exercises
→ Add to Workout
→ exercise added
→ button becomes ✓ In Workout
→ exercise appears in My Workout

```

Actual behavior:

```text
Exercises
→ Add to Workout
→ nothing added

```

## Debugging Evidence

Browser DevTools showed:

```text
Uncaught TypeError: onAddToWorkout is not a function

```

The Details implementation was working, so the issue was specific to the Exercise Explorer prop flow.

## Actual Debugging Prompt

The debugging prompt instructed Claude to trace:

```text
App.jsx
→ Exercises.jsx
→ pageExercises.map(...)
→ ExerciseCard
→ Add to Workout button
→ onAddToWorkout(exercise)

```

It specifically required Claude to verify:

- `onAddToWorkout` reaching `ExerciseCard`
- `isInWorkout` reaching `ExerciseCard`
- Button click behavior
- Correct exercise object
- Parent event handlers
- CSS/pointer-events
- Root cause before making changes
- Minimal correction only

It explicitly prohibited redesigning the Stage 6 architecture or introducing another state-management solution.

## Root Cause

The props were correctly passed from `App.jsx` to `Exercises.jsx`.

However, `Exercises.jsx` was not forwarding them to `ExerciseCard`.

The component effectively had:

```jsx
export default function Exercises() {

```

and rendered:

```jsx
<ExerciseCard key={exercise.id} exercise={exercise} />

```

Therefore, `ExerciseCard` did not receive:

```text
isInWorkout
onAddToWorkout

```

## Correction

The component was updated to receive the props:

```jsx
export default function Exercises({ isInWorkout, onAddToWorkout }) {

```

and pass them to each card:

```jsx
<ExerciseCard
  key={exercise.id}
  exercise={exercise}
  isInWorkout={isInWorkout(exercise.id)}
  onAddToWorkout={onAddToWorkout}
/>

```

## Verification

The Exercise Explorer was tested again.

The button successfully added exercises to My Workout.

The button changed to:

```text
✓ In Workout

```

Duplicate prevention continued to work.

The existing Details and My Workout functionality continued to work correctly.

### Important Classification

This was another **human-testing-discovered, AI-assisted debugging issue**.

Human contribution:

- Tested the feature
- Identified the discrepancy between Explorer and Details
- Inspected DevTools
- Provided the exact runtime error
- Verified the final fix

AI contribution:

- Traced the prop flow
- Identified the missing prop forwarding
- Implemented the minimal correction
- Explained the root cause

---

# Overall AI-Assisted Development Summary

Claude was used as a development assistant rather than as a replacement for human testing and decision-making.

The development process demonstrated several different uses of AI:

## 1. Architecture

Claude proposed and implemented the initial component and routing structure.

## 2. Incremental Implementation

Each feature was requested as a separate stage with explicit scope and constraints.

## 3. React Development

Claude implemented components, state, effects, routing, derived data, and event handling.

## 4. Data Integration

Claude integrated the exercise dataset and created a service layer for data retrieval.

## 5. Debugging

Claude was given concrete browser evidence when problems occurred.

Examples:

- Image request returning `404`
- `onAddToWorkout is not a function`

This allowed debugging to be based on actual runtime behavior rather than assumptions.

## 6. Human Validation

The generated implementation was not accepted without testing.

The application was repeatedly run and manually tested after each stage.

## 7. Controlled Scope

The prompts explicitly prevented Claude from introducing unrelated features such as:

- Redux
- Context
- Backend
- Authentication
- Database
- Advanced caching
- Unrelated application functionality

This kept the AI-generated implementation aligned with the assignment scope.

---

# Human Contributions

Human involvement included:

- Defining the application scope
- Designing the staged development approach
- Writing detailed implementation prompts
- Reviewing AI-generated architecture
- Running the application
- Testing functionality manually
- Inspecting browser behavior
- Using Chrome DevTools
- Identifying the image URL problem
- Identifying the Explorer workout bug
- Providing concrete debugging evidence to Claude
- Verifying fixes
- Deciding whether functionality met the stage requirements

The human was therefore involved throughout the development, testing, and validation process.

---

# Genuine Corrections and Improvements

The project included two significant debugging cycles.

### Image URL correction

The generated implementation produced invalid image URLs.

Human testing identified the problem through Chrome DevTools.

Claude then corrected the image base path.

### Workout prop-flow correction

The generated Stage 6 implementation failed to pass workout-related props from `Exercises.jsx` to `ExerciseCard`.

Human testing and DevTools identified the runtime error.

Claude traced and corrected the prop flow.

These should be described as **AI-assisted debugging following human testing**, rather than falsely claiming that the human manually edited the code.

---

# Final Development Outcome

The six completed stages resulted in a functional React fitness planner with:

- React/Vite foundation
- React Router
- Exercise Explorer
- Real exercise dataset
- Exercise images
- Search
- Multiple filters
- Combined filtering
- Pagination
- Exercise details
- My Workout
- Add/remove functionality
- Duplicate prevention
- Loading/error/empty states
- Responsive UI

The application was developed incrementally with AI assistance and manually validated throughout the process.