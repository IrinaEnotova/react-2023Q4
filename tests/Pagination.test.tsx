import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utils/test-utils';
import { mockItems } from './mocks/mockItems';
import App from '../App';

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', async () => {
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

    expect((await screen.findAllByText('Show details')).length).toBe(12);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(location.pathname).toBe('/');

    fireEvent.click(await screen.findByText('Next'));
    expect((await screen.findAllByText('Show details')).length).toBe(12);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(location.pathname).toBe('/page/2');
  });
});
