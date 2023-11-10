import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../context/AppContext';
import Search from '../components/Search/Search';

describe('Search component', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    const getSearch = vi.fn((searchValue: string): void => {
      localStorage.setItem('query', searchValue);
    });
    render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <Search getSearch={getSearch} />
      </AppContextProvider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'gandalf' },
    });
    fireEvent.click(screen.getByText(/Search/i));
    expect(getSearch).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('query')).toBe('gandalf');
  });

  test('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('query', 'Aragorn');
    render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <Search
          getSearch={(searchValue: string): void => {
            localStorage.setItem('query', searchValue);
          }}
        />
      </AppContextProvider>
    );

    expect(screen.getByDisplayValue('Aragorn')).toBeInTheDocument();
  });
});
