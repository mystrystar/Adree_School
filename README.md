# 🎓 Adree School Student Dashboard

A responsive Student Dashboard built with **React 19, TypeScript, Vite, Tailwind CSS, and TanStack Query**. The application fetches student data from the JSONPlaceholder API and allows users to search, filter, sort, and view student details.

## 🌐 Live Demo

https://adreeschool.netlify.app/

## 📂 GitHub Repository

https://github.com/mystrystar/Adree_School.git

---

## 🚀 Setup Instructions

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

---

## 🛠 Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Router
- React Hook Form + Zod
- Framer Motion
- Lucide React

---

## 🏗 Architecture Decisions

- Component-based React architecture
- TanStack Query for API fetching and caching
- React Hooks for local state management
- Tailwind CSS for responsive UI
- React Router for navigation
- Lazy loading and Error Boundary for improved performance and reliability

---

## 📌 Assumptions Made

- JSONPlaceholder users represent students.
- Company names are used for filtering.
- Authentication is mocked using LocalStorage.
- Avatar images are generated since the API provides none.
- Client-side filtering is sufficient because the dataset contains only 10 students.

---

## ⚖ Trade-offs

- Used client-side filtering instead of server-side due to the small dataset.
- Mock authentication was implemented as no backend authentication API was provided.
- Focused on delivering a polished responsive UI over adding additional features like pagination or dark mode.

---

## ⏱ Time Spent

Approximately **4–5 hours** including:
- UI Development
- API Integration
- Search, Filter & Sort
- Responsive Design
- Testing & Deployment

---

## ✨ Features

- Responsive Dashboard
- Login Screen
- Student Search
- Company Filter
- Sorting (A–Z / Z–A)
- Student Details Drawer
- Loading, Empty & Error States
- Netlify Deployment
