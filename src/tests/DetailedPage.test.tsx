import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../context/AppContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import DetailedPage from '../pages/DetailedPage/DetailedPage';
import { server } from './mocks/server';

describe('DetailedPage component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(async () => {
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
            <Route path="/" element={<CharactersPage />}>
              <Route path="" element={<DetailedPage />}></Route>
            </Route>
            <Route path="/page/:id" element={<CharactersPage />}>
              <Route path="" element={<DetailedPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    );

    expect((await screen.findAllByText('Show details')).length).toBe(12);
    fireEvent.click((await screen.findAllByText('Show details'))[0]);
  });

  test('loading indicator is displayed while fetching data', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('correctly displays the detailed card data', async () => {
    expect(await screen.findByText(/Race - Hobbit/i)).toBeInTheDocument();
    expect(await screen.findByText(/Race - Hobbit/i)).toBeInTheDocument();
    expect(await screen.findByText(/Gender - Female/i)).toBeInTheDocument();
    expect(await screen.findByText(/Birth - TA 2818/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spouse - Marmadoc Brandybuck/i)).toBeInTheDocument();
    expect(screen.queryByText(/Some random text/i)).not.toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    expect(await screen.findByText(/Race - Hobbit/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByText('Close details'));
    const searchParams = new URLSearchParams(location.search);
    const character = searchParams.get('character');
    expect(character).toBeNull();
  });
});
