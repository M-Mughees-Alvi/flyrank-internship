# FitPlanner

A React-based fitness planner built as part of the FlyRank AI Frontend Engineering internship.

FitPlanner allows users to explore a large exercise dataset, search and filter exercises, view exercise details, and build a personal workout plan during the current browser session.

The application was developed incrementally with Claude as an AI development assistant. Each stage was implemented, tested, reviewed, and debugged before moving to the next stage.

## Features

- Responsive application layout
- Home page
- Exercise Explorer
- Exercise search
- Target muscle filtering
- Equipment filtering
- Difficulty filtering
- Combined search and filtering
- Client-side pagination
- Exercise details pages
- Exercise images with fallback handling
- Add exercises to My Workout
- Remove exercises from My Workout
- Duplicate workout prevention
- Workout state shared between application pages
- Loading, error, and empty states
- Responsive exercise card/grid layout

## Technology Stack

- React
- Vite
- React Router
- JavaScript
- Plain CSS
- Free Exercise DB dataset
- Claude for AI-assisted development and debugging

No backend, database, authentication, Redux, Zustand, or other external state-management library is used.

## Application Structure

```text
src/
├── components/
│   ├── ExerciseCard.jsx
│   ├── ExerciseDetails.jsx
│   ├── ExerciseFilters.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   └── Pagination.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Exercises.jsx
│   ├── ExerciseDetails.jsx
│   └── MyPlan.jsx
│
├── services/
│   └── exerciseApi.js
│
├── App.jsx
├── main.jsx
└── index.css

```

The exact structure may evolve as the application develops.

## Main Routes


| Route            | Purpose                     |
| ---------------- | --------------------------- |
| `/`              | Home page                   |
| `/exercises`     | Exercise Explorer           |
| `/exercises/:id` | Individual exercise details |
| `/my-plan`       | My Workout                  |


The `/my-plan` route is intentionally retained from the original application structure even though the visible feature is presented as "My Workout."

## Exercise Explorer

The Exercise Explorer loads the complete exercise dataset into the browser.

The filtering flow is:

```text
876 exercises
      ↓
Search + Filters
      ↓
Filtered exercises
      ↓
Pagination
      ↓
Displayed exercise cards

```

Search is case-insensitive and supports partial matches.

The available filters are generated from the loaded exercise data rather than relying on a large hardcoded list.

The application displays a maximum of 24 exercises per page.

When search or filter criteria change, pagination resets to page 1.

## Exercise Details

Selecting "View Details" opens a dynamic route:

```text
/exercises/:id

```

The details page uses the exercise ID to retrieve the corresponding exercise data and displays useful exercise-specific information such as:

- Exercise name
- Images
- Target muscles
- Equipment
- Difficulty
- Instructions
- Additional available exercise metadata

Invalid or unavailable exercise IDs are handled with an appropriate error state.

## My Workout

Users can add exercises from both:

- Exercise Explorer
- Exercise Details

The workout is stored in React application state so it remains available while navigating between the relevant pages during the current session.

Duplicate exercises are prevented.

Users can:

- View the number of selected exercises
- View their selected exercises
- Remove exercises
- Return to the Exercise Explorer

No `localStorage`, backend, database, authentication, or account system is used for workout persistence.

## Development Approach

The application was developed incrementally through six stages.

### Stage 1 — Project Foundation

Established the initial React/Vite application shell:

- React Router
- Layout
- Navbar
- Home page
- Exercises page
- My Plan page
- Initial global styling

### Stage 2 — Exercise Explorer UI

Introduced:

- Reusable `ExerciseCard`
- Temporary local exercise data
- Responsive exercise grid
- Exercise metadata
- Difficulty display
- Card interactions

### Stage 3 — Real Exercise Data

Replaced the temporary exercise data with the real exercise dataset.

Implemented:

- API/data service
- Data normalization
- Loading state
- Error state
- Empty state
- AbortController cleanup
- Exercise image handling
- Image fallback behavior

During testing, an incorrect image URL path was discovered and corrected with AI-assisted debugging.

### Stage 4 — Search, Filtering & Pagination

Implemented:

- Name search
- Target muscle filter
- Equipment filter
- Difficulty filter
- Combined filtering
- Clear Filters
- Result count
- No-match state
- Client-side pagination
- 24 exercises per page
- Page reset after search/filter changes
- Invalid-page protection

### Stage 5 — Exercise Details

Implemented:

- Dynamic exercise routes
- Exercise details page
- Exercise-specific data retrieval
- Exercise instructions and metadata
- Invalid-ID handling
- Loading/error states
- Image handling
- Back-to-Exercises navigation

### Stage 6 — My Workout

Implemented:

- Add to Workout
- Remove from Workout
- Duplicate prevention
- Workout count
- Empty state
- Shared workout state across pages
- Add functionality from Explorer and Details
- My Workout display

During testing, an Explorer-specific prop-passing bug was discovered and resolved through AI-assisted debugging.

## AI-Assisted Development

Claude was used as a development assistant throughout the project.

The AI was used for:

- Architecture proposals
- React component implementation
- React Router implementation
- UI implementation
- API/data integration
- State-management implementation
- Debugging
- Refactoring and targeted corrections
- Explaining implementation decisions

The development process was intentionally iterative rather than relying on a single prompt to generate the complete application.

Each stage was implemented separately, tested manually, and only then used as the foundation for the next stage.

## Human Review & Testing

The application was manually tested throughout development.

Examples of human testing included:

- Running the application after each major stage
- Verifying routing behavior
- Checking exercise card rendering
- Testing real exercise images
- Inspecting failed image requests in Chrome DevTools
- Testing search and combined filters
- Testing pagination boundaries
- Testing page reset after filtering
- Testing invalid exercise IDs
- Testing Add to Workout from multiple pages
- Testing duplicate prevention
- Testing removal from My Workout

Human testing was therefore an important part of the AI-assisted development workflow rather than simply accepting generated code without verification.

## Current Scope

The current implementation focuses on exercise discovery and workout planning.

The following were intentionally not implemented:

- Authentication
- User accounts
- Backend
- Database
- Payments
- Social features
- Wearable integrations
- Progress tracking
- AI coaching
- Medical advice
- Calorie/medical recommendations
- Advanced caching
- External state-management libraries

These features are outside the current assignment scope.

## Running the Project

Install dependencies:

```bash
npm install

```

Start the development server:

```bash
npm run dev

```

Build the application:

```bash
npm run build

```

## Assignment Context

This project was developed for the FlyRank AI Frontend Engineering internship as a React application development assignment.

The assignment required:

- A completed working application
- The prompts used during development
- An explanation of how AI assisted implementation
- Examples of testing, corrections, and improvements after reviewing AI-generated code

The detailed AI development history is documented separately in:

`AI-DEVELOPMENT-LOG.md`

