import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../context/AppContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', async () => {
    render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<CharactersPage />}>
              <Route path="/page/:id" element={<CharactersPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppContextProvider>
    );

    expect((await screen.findAllByText('Show details')).length).toBe(12);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();

    fireEvent.click(await screen.findByText('Next'));
    expect((await screen.findAllByText('Show details')).length).toBe(12);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});