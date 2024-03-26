import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
  };

  console.log(`Current mode: ${mode}`); // This should log "Current mode: development" in development mode

  if (mode === "development") {
    config.server = {
      proxy: {
        "/login": "http://127.0.0.1:3000",
        "/logout": "http://127.0.0.1:3000",
        "/api": "http://127.0.0.1:3000",
      },
    };
  }

  return config;
});
