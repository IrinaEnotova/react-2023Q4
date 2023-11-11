import { fireEvent, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApiItem from '../interfaces/interfaces';
import { AppContextProvider } from '../context/AppContext';
import ItemList from '../components/ItemList/ItemList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import DetailedPage from '../pages/DetailedPage/DetailedPage';

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
  beforeEach(() => {
    const items = [
      {
        _id: '5cd99d4bde30eff6ebccfc62',
        height: '',
        race: 'Hobbit',
        gender: 'Female',
        birth: 'TA 2818',
        spouse: 'Marmadoc Brandybuck',
        death: '',
        realm: '',
        hair: '',
        name: 'Adaldrida (Bolger) Brandybuck',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adaldrida_(Bolger)_Brandybuck',
      },
      {
        _id: '5cd99d4bde30eff6ebccfe63',
        height: '',
        race: 'Hobbit',
        gender: '',
        birth: '',
        spouse: '',
        death: '',
        realm: '',
        hair: '',
        name: 'Adalgar Bolger',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adalgar_Bolger',
      },
      {
        _id: '5cd99d4bde30eff6ebccfe21',
        height: '',
        race: 'Hobbit',
        gender: 'Male',
        birth: 'TA 2880',
        spouse: 'Unnamed wife',
        death: 'TA 2982',
        realm: '',
        hair: '',
        name: 'Adalgrim Took',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adalgrim_Took',
      },
      {
        _id: '5cd99d4bde30eff6ebccfe22',
        height: '',
        race: 'Hobbit',
        gender: 'Female',
        birth: 'TA 2817',
        spouse: 'Gerontius "The Old" Took',
        death: 'TA 2923',
        realm: '',
        hair: '',
        name: 'Adamanta (Chubb) Took',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adamanta_(Chubb)_Took',
      },
      {
        _id: '5cd99d4bde30eff6ebccfbbe',
        height: '',
        race: 'Human',
        gender: 'Female',
        birth: '',
        spouse: 'Belemir',
        death: '',
        realm: '',
        hair: '',
        name: 'Adanel',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adanel',
      },
      {
        _id: '5cd99d4bde30eff6ebccfe24',
        height: '',
        race: 'Hobbit',
        gender: 'Male',
        birth: 'TA 2928',
        spouse: 'Unnamed wife',
        death: 'FO 2',
        realm: '',
        hair: '',
        name: 'Adelard Took',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adelard_Took',
      },
      {
        _id: '5cd99d4bde30eff6ebccfbbf',
        height: '',
        race: 'Human',
        gender: 'Male',
        birth: 'Before ,TA 1944',
        spouse: '',
        death: 'Late ,Third Age',
        realm: '',
        hair: '',
        name: 'Adrahil I',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adrahil_I',
      },
      {
        _id: '5cd99d4bde30eff6ebccfbc0',
        height: '',
        race: 'Human',
        gender: 'Male',
        birth: 'TA 2917',
        spouse: 'Unnamed wife',
        death: 'TA 3010',
        realm: '',
        hair: '',
        name: 'Adrahil II',
        wikiUrl: 'http://lotr.wikia.com//wiki/Adrahil_II',
      },
      {
        _id: '5cd99d4bde30eff6ebccfbc1',
        height: '',
        race: 'Elf',
        gender: 'Male',
        birth: 'YT during the ,Noontide of Valinor',
        spouse: 'Loved ,Andreth but remained unmarried',
        death: 'FA 455',
        realm: '',
        hair: 'Golden',
        name: 'Aegnor',
        wikiUrl: 'http://lotr.wikia.com//wiki/Aegnor',
      },
      {
        _id: '5cdbdecb6dc0baeae48cfadd',
        death: 'NaN',
        birth: 'NaN',
        hair: 'NaN',
        realm: 'NaN',
        height: 'NaN',
        spouse: 'NaN',
        gender: 'NaN',
        name: 'Aerandir',
        race: 'NaN',
        wikiUrl: '',
      },
      {
        _id: '5cd99d4bde30eff6ebccfbc2',
        height: '',
        race: 'Human',
        gender: 'Female',
        birth: 'Mid ,First Age',
        spouse: 'Brodda',
        death: 'FA 495',
        realm: '',
        hair: '',
        name: 'Aerin',
        wikiUrl: 'http://lotr.wikia.com//wiki/Aerin',
      },
      {
        _id: '5cdbdecb6dc0baeae48cfadc',
        death: 'NaN',
        birth: 'NaN',
        hair: 'NaN',
        realm: 'NaN',
        height: 'NaN',
        spouse: 'NaN',
        gender: 'NaN',
        name: 'Agathor',
        race: 'NaN',
        wikiUrl: '',
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

  const spyFetch = vi.spyOn(global, 'fetch');
  test('clicking triggers an additional API call to fetch detailed information', async () => {
    expect(spyFetch).toHaveBeenCalledOnce();
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
