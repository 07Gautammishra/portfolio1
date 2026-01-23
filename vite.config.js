import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      webp: { lossy: true, quality: 75 },
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'sortAttrs', active: true },
        ],
      },
    }),
  ],
});
