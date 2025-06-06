import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  
    build: {
      sourcemap: false, // disables .map files
      rollupOptions: {
        output: {
          manualChunks: undefined, // optional: reduce output file count
        },
      },
    },
  }   
  
  
);
