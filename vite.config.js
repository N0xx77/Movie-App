import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set base to the repository name for GitHub Pages project site
  base: '/Movie-App/',
  plugins: [react(),
    tailwindcss(),
  ],
})
