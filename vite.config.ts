import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  publicDir: 'public',
  base: 'https://Beomtae.github.io/react-shopping-cart/',
});
