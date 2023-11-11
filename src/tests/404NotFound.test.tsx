import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../context/AppContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import NotFound from '../components/NotFound/NotFound';

describe('404 Not Found component', () => {
  test('is displayed when navigating to an invalid route', async () => {
    render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <MemoryRouter initialEntries={['/someinvalidroute']}>
          <Routes>
            <Route path="/" element={<CharactersPage />}>
              <Route path="/page/:id" element={<CharactersPage />} />
            </Route>
            <Route path="*" element={<NotFound>Page was not found</NotFound>}></Route>
          </Routes>
        </MemoryRouter>
      </AppContextProvider>
    );

    expect(screen.getByText('Page was not found')).toBeInTheDocument();
  });
});
