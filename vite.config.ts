/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 10000,
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setup-tests.ts']
    }
  }
});
