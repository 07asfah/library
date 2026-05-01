# Book Library

A React + Vite web application for browsing and managing a book library, with separate user and admin areas. Books are sourced from the Google Books API.

## Tech Stack

- **JavaScript (JSX)** — application code
- **React 19** with **React Router DOM 7**
- **Vite 6** — dev server and bundler
- **Tailwind CSS 4** — styling
- **Axios** — HTTP client
- **Lucide React** — icons
- **Google Books API** — book data
- **ESLint 9** — linting

## Features

- Public pages: Home, Login, Signup
- User-protected library browsing
- Admin login and dashboard (protected routes)
- Book detail view
- Auth state via `AdminContext`

## Project Structure

```
src/
  components/   Reusable UI (Navbar, Footer, forms, route guards…)
  context/      AdminContext for auth state
  layouts/      MainLayout
  pages/        Home, Login, Signup, Library, BookDetail, AdminLogin, AdminDashboard
  routes/       AppRoutes
  utils/        Api.js, config.js, errors.js, googleBooksApi.js
  App.jsx       Router setup
  main.jsx      Entry point
  index.css     Tailwind entry
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Environment

Create a `.env` file at the project root:

```
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

### Run
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```
