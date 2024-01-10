import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", //reindirizza le richieste a route che iniziano con /api e /img a localhost:3000
      "/img": "http://localhost:3000" //evita problemi di cross origin resource sharing
    }
  }
})