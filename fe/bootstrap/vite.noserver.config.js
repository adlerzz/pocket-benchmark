import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
    base: './',
    plugins: [svelte({
      
        onwarn: (warning, handler) => {
          if (warning.code.startsWith('a11y')) {
            return; 
          }
          handler(warning);
        }
      
    })],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components')
        }
    },
    build: {
        target: 'esnext',
        assetsInlineLimit: 100_000_000,
        cssCodeSplit: false,
        outDir: '../../app',
        rollupOptions: {
            output: {
                manualChunks: undefined,
                entryFileNames: 'bundle.js',
                assetFileNames: 'style.css'
            }
        }
    }
});