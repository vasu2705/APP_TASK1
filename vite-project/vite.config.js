import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/forgot": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },'/logout': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },      
      '/signin': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },      
      '/signup': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },  
    },
  },
});
