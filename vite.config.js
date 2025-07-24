import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp3'], // Add this to handle MP3 imports
  server: {
    historyApiFallback: true, // For client-side routing
  },
  build: {
    assetsInlineLimit: 0, // Ensure audio files are copied as-is (not inlined)
  }
});