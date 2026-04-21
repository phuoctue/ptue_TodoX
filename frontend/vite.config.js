import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // proxy requests starting with /api to the backend server
      "/api": {
        target: "http://localhost:5001", // <<-- ĐÃ CẬP NHẬT PORT LÊN 5001
        changeOrigin: true,
        // rewrite path để loại bỏ tiền tố /api trước khi gửi đến backend
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
