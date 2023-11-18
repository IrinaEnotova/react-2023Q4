import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { renderWithProviders } from '../utils/test-utils';
import { mockItems } from '../mocks/mockItems';

describe('App component', () => {
  beforeEach(() => {
    renderWithProviders(<App />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
          items: mockItems,
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isAllItemsLoading: false,
          isSingleItemLoading: false,
        },
      },
    });
  });

  test('contains items', async () => {
    expect((await screen.findAllByText('Show details')).length).toBe(12);
  });

  test('contains SelectLimit and Search components', async () => {
    expect((await screen.findAllByText('Show details')).length).toBe(12);
    expect(screen.getByText('Change limit')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Throw error')).toBeInTheDocument();
  });
});
