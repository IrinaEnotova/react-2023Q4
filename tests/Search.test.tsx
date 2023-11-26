import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search/Search';
import { renderWithProviders } from './utils/test-utils';

describe('Search component', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    const getSearch = vi.fn((searchValue: string): void => {
      localStorage.setItem('query', searchValue);
    });
    renderWithProviders(<Search getSearch={getSearch} />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: localStorage.getItem('query') || '',
          items: [],
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isErrorBoundary: false,
        },
      },
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'gandalf' },
    });
    fireEvent.click(screen.getByText(/Search/i));
    expect(getSearch).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('query')).toBe('gandalf');
  });
});
