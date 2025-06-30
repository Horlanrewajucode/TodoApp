# 📝 Todo Application
A modern, fully-featured Todo List application built with React 19, React Router, TanStack Query (React Query v5), Tailwind CSS, and DaisyUI. This app demonstrates core frontend skills such as routing, state management, API integration, UI/UX best practices, and accessibility compliance.

## 🚀 Features
✅ Add, edit, delete, and mark todos as completed

✅ Paginated todo display (10 per page)

✅ Dummy Calendar integration on Home Page

✅ Accessible and responsive design with DaisyUI

✅ Optimistic UI updates with React Query

✅ Local storage caching fallback

✅ Error boundaries for better UX on failures

✅ Skeleton loaders for fetching states

### 🛠️ Installation & Setup
1. Clone the Repository
- `git clone https://github.com/Horlanrewaju/TodoApp.git`
- `cd todo-app`

2. Install Dependencies
- `npm install`

3. Run the App
- `npm run dev`

4. Build for Production
- `npm run build`

5. Preview Production Build
- `npm run preview`

### 📂 Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start the Vite dev server |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview built app locally |

### Live Website
[MyTodoApp](MyTodoApp)

### 🧱 Tech Stack & Architecture

- React 19 – Functional components with hooks

- React Router v7 – Page routing with error handling

- React Query v5 – Server state, caching, and mutations

- Tailwind CSS + DaisyUI – Utility-first CSS with elegant UI components

- Vite – Lightning-fast development and build tool

- JSONPlaceholder – Fake REST API for todos (https://jsonplaceholder.typicode.com/todos)

| Home Page                       | Paginated Todos                             | Error Page                      |
| ------------------------------- | ------------------------------------------- | ----------------------------- |
| ![home](/public/screenshots/home.png) | ![pagination](/public/screenshots/paginated%20todo.png) | ![add](/public/screenshots/error%20page.png) |

 ### 🐞Known Issues
- New todos are not persisted to the backend (due to mock API)
- Calendar integration does not yet filter todos by date
- No Validation on Add/Edit

### 🔮 Future Improvements
✅ Filter todos by date from calendar

✅ Authentication (Login/Signup)

✅ User-specific todo lists

✅ Backend integration with Firebase or Supabase

✅ Drag-and-drop to reorder todos

✅ PWA support with offline capabilities

### 👨‍💻 Author
Developed as part of AltSchool Africa Frontend Engineering Program.




