import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages: keep assets working under /<repo>/
  base: './',
  plugins: [react()],
})
