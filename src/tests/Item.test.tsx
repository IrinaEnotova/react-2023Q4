import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApiItem from '../interfaces/interfaces';
import { AppContextProvider } from '../context/AppContext';
import ItemList from '../components/ItemList/ItemList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import DetailedPage from '../pages/DetailedPage/DetailedPage';
import { server } from './mocks/server';

describe('Item component', () => {
  test('renders the relevant card data', () => {
    const items: ApiItem[] = [
      {
        birth: 'First Age',
        death: 'FA 495',
        gender: 'Female',
        hair: 'Golden',
        height: '',
        name: 'Finduilas',
        race: 'Elf',
        realm: '',
        spouse: 'None; betrothed to ,Gwindor, but never married.',
        wikiUrl: 'http://lotr.wikia.com//wiki/Finduilas',
        _id: '5cd99d4bde30eff6ebccfce7',
      },
    ];

    render(
      <AppContextProvider
        value={{
          items: items,
          searchQuery: '',
          selectedItemId: '',
        }}
      >
        <BrowserRouter>
          <ItemList />
        </BrowserRouter>
      </AppContextProvider>
    );

    expect(screen.queryAllByText('Show details').length).toBe(1);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Finduilas');
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Show details');
  });
});

describe('Item component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
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
  });

  const requestSpy = vi.fn();
  server.events.on('request:start', requestSpy);
  test('clicking triggers an additional API call to fetch detailed information', async () => {
    expect(requestSpy).toHaveBeenCalledOnce();
    expect((await screen.findAllByText('Show details')).length).toBe(12);
    fireEvent.click((await screen.findAllByText('Show details'))[0]);
    const searchParams = new URLSearchParams(location.search);
    const character = searchParams.get('character');
    expect(character).toBe('5cd99d4bde30eff6ebccfc62');
  });

  test('clicking on a card opens a detailed card component', async () => {
    expect((await screen.findAllByText('Show details')).length).toBe(12);
    fireEvent.click((await screen.findAllByText('Show details'))[0]);
    expect(await screen.findByText(/Race - Hobbit/i)).toBeInTheDocument();
    expect(await screen.findByText(/Gender - Female/i)).toBeInTheDocument();
    expect(await screen.findByText(/Birth - TA 2818/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spouse - Marmadoc Brandybuck/i)).toBeInTheDocument();
    expect(screen.queryByText(/Some random text/i)).not.toBeInTheDocument();
  });
});
