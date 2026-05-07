# 🎲 Dice Duel App

A React application for browsing, filtering, and comparing board games.

## Features

- Browse a list of board games
- Search and filter by category
- Sort by title and category
- Add/remove favorites (saved in localStorage)
- Compare up to 2 games
- View detailed game information

##  Tech Stack

- React
- JavaScript
- CSS / Bootstrap
- React Router
- Context API

## Project Architecture

This project follows a modular component-based architecture.

- **Main pages** → List, Detail
- **Components** → Reusable UI elements
- **Context** → Global state management
- **Custom Hooks** → Local storage handling

## Folder Structure

```
src/
├── components/
├── pages/
├── layouts/
├── contexts/
├── hooks/
└── App.jsx
```

## What I learned

- Managing global state with Context API
- Optimizing performance with `useMemo`, `useCallback`, and `React.memo`
- Implementing debounced search
- Handling API calls and error states
- Persisting data with localStorage

## Project Context

This project was developed as part of a Full Stack Web Development course.

It was used as a final evaluation project to apply React concepts, state management, and API integration in a real-world scenario.

- 7 working days
- Final project presentation and evaluation
