import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
expect.extend(matchers);
import nodeFetch, { Request, Response } from 'node-fetch';

Object.assign(global, { fetch: nodeFetch, Request, Response });

beforeAll(() => {
  vi.mock('next/router', () => vi.importActual('next-router-mock'));
});
afterEach(() => {
  cleanup();
});
