import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.NODE_ENV === 'development' ? [] : [basicSsl()]),
  ],
  server: {
    https: {
      key: fs.readFileSync('./cert.key'),
      cert: fs.readFileSync('./cert.crt'),
    },
    port: 5173,
  }
});
