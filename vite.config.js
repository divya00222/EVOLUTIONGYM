import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        trainers: resolve(__dirname, 'trainers.html'),
        membership: resolve(__dirname, 'membership.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
