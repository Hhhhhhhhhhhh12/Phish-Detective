import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Browser journeys use Playwright and must not be collected by Vitest.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
