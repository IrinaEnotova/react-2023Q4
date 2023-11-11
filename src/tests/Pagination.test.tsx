import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../context/AppContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import { server } from './mocks/server';

describe('Pagination component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('updates URL query parameter when page changes', async () => {
    render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CharactersPage />}></Route>
            <Route path="/page/:id" element={<CharactersPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    );

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
