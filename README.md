# SerenAI

SerenAI is a single Next.js App Router application. API route handlers run server-side, connect to MongoDB with Mongoose, authenticate users with an HTTP-only JWT cookie, and serve Inngest functions.

## Setup

1. Install the root dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` if you do not already have a local environment file.
3. Set `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in `.env.local`. The chat response uses Gemini directly. For local mood/activity background events, run `npx inngest-cli@latest dev` in a separate terminal; configure `INNGEST_EVENT_KEY` when using Inngest outside local development.
4. Start the app with `npm run dev` and open `http://localhost:3000`.

Never expose these values through `NEXT_PUBLIC_*` variables or commit `.env.local`.

## Structure

- `app/api`: Next.js route handlers for auth, chat, mood, activity, and Inngest.
- `lib`: server utilities, database connection, authentication, AI, Inngest, and browser API clients.
- `models`: Mongoose schemas.
- `components` and `app`: client UI and pages.

Run `npm run build` before deployment. The API requires MongoDB network access and valid server-side environment variables.
