# Movie App

Live demo: https://N0xx77.github.io/Movie-App/

A React + Vite movie discovery app that fetches data from TMDB and tracks trending searches with Appwrite.

## Features

- Browse popular movies
- Search movies with debounced input
- View top trending searches (based on stored counts)
- Movie cards with rating, language, poster, and release date info

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Appwrite SDK
- react-use (`useDebounce`)

## Project Structure

```text
Movie-App/
	public/
		hero.png
		hero-bg.png
		no-movie.png
		search.svg
		star.svg
	src/
		Components/
			MovieCard.jsx
			Search.jsx
			Spinner.jsx
		appwrite.js
		App.jsx
		index.css
		main.jsx
```

## Environment Variables

Create a `.env` file in the `Movie-App` folder containing the following required keys:

```env
# TMDB (required) — TMDB v4 Read Access Token. If your token starts with "Bearer ", include only the token string or follow the project's usage convention.
VITE_TMDB_API_KEY=your_tmdb_v4_read_token

# Appwrite (required) — endpoint plus the project / database / collection IDs used by the app
VITE_APPWRITE_ENDPOINT=https://your-appwrite.example.com/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

Notes:
- `VITE_TMDB_API_KEY`: used to fetch data from TMDB. Keep this secret — do not commit it.
- `VITE_APPWRITE_ENDPOINT`: include the protocol and `/v1` path if applicable. The app uses this to initialize the Appwrite client.
- All Appwrite IDs are required for the trending/search storage to work.
- Never commit real API keys or tokens. The project ignores `.env` (see `.gitignore`).

Requirements:
- Node.js 18+ is recommended for Vite 8 projects.
- An Appwrite project with a database and a collection matching the schema described below.

Example `.env` (placeholders):

```env
VITE_TMDB_API_KEY=0123456789abcdef0123456789abcdef
VITE_APPWRITE_ENDPOINT=https://appwrite.example.com/v1
VITE_APPWRITE_PROJECT_ID=60a7f3e2d9c3b
VITE_APPWRITE_DATABASE_ID=60a7f3e2d9c3c
VITE_APPWRITE_COLLECTION_ID=60a7f3e2d9c3d
```

You can also copy the provided `.env.example` and fill in your values:

```bash
cp .env.example .env
```

Note: This project ignores the `.env` file (see `.gitignore`) to avoid committing secrets.
If `.env` is already tracked in your repository, stop tracking it (run in the repo root):

```bash
git rm --cached .env
git add .gitignore
git commit -m "Ignore .env and stop tracking it"
```

If this folder is not yet a Git repository, run `git init` in the project root or run the above commands in the correct repository root.

## Appwrite Collection Requirements

The collection used for trending metrics should support these fields:

- `searchTerm` (string)
- `count` (number)
- `movie_id` (number)
- `poster_url` (string)

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown by Vite (typically `http://localhost:5173`).

## Deployment (GitHub Pages)

This repository is configured to deploy the built site to GitHub Pages using GitHub Actions. Key notes:

- The Vite `base` is set to `/Movie-App/` in `vite.config.js` so the site works as a project site at `https://<username>.github.io/Movie-App/`.
- The workflow `/.github/workflows/gh-pages.yml` builds the site and publishes the `dist` folder.
- Set the following repository secrets (Settings → Secrets → Actions) so the Actions build can include your environment values at build time:
	- `VITE_TMDB_API_KEY`
	- `VITE_APPWRITE_ENDPOINT`
	- `VITE_APPWRITE_PROJECT_ID`
	- `VITE_APPWRITE_DATABASE_ID`
	- `VITE_APPWRITE_COLLECTION_ID`

After adding the secrets, push to `main` and the workflow will run and publish the site. You can also build locally and manually publish `dist` to `docs/` if you prefer.

## Scripts

- `npm run dev` starts the development server
- `npm run build` builds for production
- `npm run preview` previews the production build
- `npm run lint` runs ESLint

## Troubleshooting

- Blank or failed movie list: verify `VITE_TMDB_API_KEY` is valid.
- Trending section not loading: verify Appwrite project/database/collection IDs and permissions.
- Search results delayed: input is intentionally debounced by 1 second.
