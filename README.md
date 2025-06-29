# Next.js Task Manager

A feature-rich task management application built with the **Next.js App Router**. 
This project demonstrates a modern frontend architecture using server-centric components, client-side state management with React Hooks, and a suite of advanced user-facing features.

Deployed to Vercel [here](https://task-manager-next-js-practice.vercel.app/)
---

##  Index

- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)

---
![image](https://github.com/user-attachments/assets/9b8b9d3c-7db2-4de3-a9b6-045bb454bdb8)
![image](https://github.com/user-attachments/assets/75c3379c-7bac-4c47-8dcf-2a150075d155)
![image](https://github.com/user-attachments/assets/258f6fb6-3a66-46f6-a4a0-f8f7585fbce5)


##  Core Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete tasks with a clean UI.
- **Client-Side State Management**: Centralized state logic managed by `useReducer` and propagated through the component tree via the React Context API.
- **Persistent State**: Application state is persisted across page reloads using the Web Storage API (`localStorage`), hydrated on the client.
- **File-System Based Routing**: Utilizes the Next.js App Router for a clear separation of concerns, including dynamic routes for task editing (`/task/[id]`).
- **Drag-and-Drop Reordering**: Interactive task reordering on the main dashboard, implemented with `@hello-pangea/dnd`.
- **Dynamic Sorting**: Client-side sorting of tasks by due date, priority, or status.
- **Theming**: Switch between light and dark modes, powered by `next-themes` and Tailwind CSS's class-based strategy.
- **Data Portability**: Export the current task list to a JSON file and import tasks from a valid JSON file, appending them to the existing list.

---

##  Technical Architecture

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript (with JSX)
- **Styling**: Tailwind CSS with a class-based strategy for dark mode toggling.
- **State Management**: A combination of `useReducer` and Context API hooks for centralized and predictable state transitions. 
  This lightweight approach avoids the boilerplate of larger state management libraries for a project of this scale.
- **Drag & Drop**: [`@hello-pangea/dnd`](https://www.npmjs.com/package/@hello-pangea/dnd), a maintained fork of `react-beautiful-dnd` compatible with React 18 StrictMode.

---

##  Getting Started

###  Prerequisites

Ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (v18.x or later)
- npm, yarn, or pnpm
- Git

###  Installation & Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Charon-68/Task-manager-nextJS-practice
    ```

      ```bash
    cd Task-manager-nextJS-practice
    ```

2. **Install `pnpm` and project dependencies**:

    ```bash
    npm install -g pnpm
    pnpm install
    ```

3. **Run the development server**:

    ```bash
    pnpm run dev
    ```

4. The application will be available at: 
   [http://localhost:3000](http://localhost:3000)

---

## Project Structure

Follows the standard Next.js App Router layout:

.
├── node_modules
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   └── app
│       ├── components
│       │   ├── ExportTasks.js
│       │   ├── ImportTasks.js
│       │   ├── Navbar.js
│       │   ├── TaskForm.js
│       │   ├── TaskTable.js
│       │   └── ThemeSwitcher.js
│       ├── context
│       │   └── TaskContext.js
│       ├── create
│       │   └── page.js
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.js
│       ├── page.js
│       ├── providers.js
│       └── task
│           └── [id]
│               └── page.js
├──tailwind.config.js
├──jsconfig.json
├──next.config.mjs
├──package.json
├──pnpm-lock.yaml
├──postcss.config.mjs
└──README.md


