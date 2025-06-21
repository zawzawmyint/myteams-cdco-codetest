### Introduction

My Team is a web application for managing sports teams and players. It provides a user-friendly interface to view, add, edit, and manage team rosters with player details.

### Key Features

- Team management (create, view, edit teams)
- Player roster management
- Team cards with player statistics
- Form validation for team creation/editing
- Redux state management for teams and players

### Tech Stack

- Frontend Framework : Next.js
- UI Components : Custom UI components built with React
- State Management : Redux Toolkit
- Form Handling : React Hook Form with Zod validation
- Styling : CSS Modules/Tailwind (based on globals.css)
- Package Manager : pnpm
- Type Checking : TypeScript
  The project follows a clean component-based architecture with separation of concerns between:

- UI components (in src/components )
- State management (in src/lib/features )
- Utility functions and validation (in src/utils )

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/zawzawmyint/myteams-cdco-codetest.git
   cd myteams-cdco-codetest
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Start the development server**:
   ```bash
   pnpm run dev
   ```
4. **Build the project for production**:
   ```bash
   pnpm run build
   ```
