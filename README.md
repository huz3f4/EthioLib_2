# EthioLib

EthioLib is a modern digital library designed for Ethiopian students. It provides access to the new curriculum textbooks, teacher guides, and a wide range of fiction and non-fiction books.

## Features

- **Curriculum Access**: Textbooks and teacher guides for Grades 1-12.
- **Search**: Quick search functionality for subjects, grades, or specific book titles.
- **Personal Library**: User accounts to save favorites and organize reading lists.
- **Dark Mode Support**: Comfortable reading experience in any lighting condition.
- **Responsive Design**: Built with Tailwind CSS and Framer Motion for a seamless mobile and desktop experience.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (motion/react)
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React

## System Architecture
EthioLib follows a **Single Page Application (SPA)** architecture. The frontend is built with React and Vite for optimized performance. It communicates directly with **Supabase (Backend-as-a-Service)** for data persistence and user authentication, eliminating the need for a custom intermediary server and ensuring real-time performance.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Supabase account for database and authentication.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following placeholders:
   ```env
   VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   VITE_APP_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation
1. **Database Setup**: See `SUPABASE_SETUP.md` for manual steps or `schema.sql` for the raw export.
2. **Summary**: See `PROJECT_SUMMARY.md` for an executive overview.