import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
expect.extend(matchers);

beforeAll(() => {
  vi.mock('next/router', () => vi.importActual('next-router-mock'));
});
afterEach(() => {
  cleanup();
});
