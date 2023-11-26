'use client';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utils/test-utils';
import { mockItems } from './mocks/mockItems';
import PageNotFound from '../pages/404';

describe('404 Not Found component', () => {
  test('is displayed when navigating to an invalid route', async () => {
    renderWithProviders(<PageNotFound />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
          items: mockItems,
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isErrorBoundary: false,
        },
      },
    });

    expect(screen.getByText(/Page was not found/i)).toBeInTheDocument();
  });
});
