import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [
    svelte({
      
        onwarn: (warning, handler) => {
          if (warning.code.startsWith('a11y')) {
            return; 
          }
          handler(warning);
        }
      
    })
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components')
    }
  }
});