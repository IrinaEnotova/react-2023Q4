import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../../context/AppContext';
import App from '../../App';

describe('App component', () => {
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
        <App />
      </AppContextProvider>
    );
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