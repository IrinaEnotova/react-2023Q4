import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '../../components/ItemList/ItemList';
import ApiItem from '../../interfaces/interfaces';
import { AppContextProvider } from '../../context/AppContext';

describe('ItemList component', () => {
  test('renders the specified number of cards and works correctly with items', () => {
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
      {
        birth: 'YT during the ,Noontide of Valinor',
        death: 'FA 472',
        gender: 'Male',
        hair: 'Dark',
        height: '',
        name: 'Fingon',
        race: 'Elf',
        realm: 'Hithlum',
        spouse: '',
        wikiUrl: 'http://lotr.wikia.com//wiki/Fingon',
        _id: '5cd99d4bde30eff6ebccfceb',
      },
    ];

    const { getByText } = render(
      <AppContextProvider
        value={{
          items: items,
          searchQuery: '',
        }}
      >
        <ItemList changeSearchParams={(): void => {}} />
      </AppContextProvider>
    );

    for (const item of items) {
      const nameElement = getByText(item.name);
      expect(nameElement).toBeInTheDocument();
    }

    expect(screen.queryAllByText('Show details').length).toBe(2);
  });

  test('renders the specified number of cards', () => {
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
        }}
      >
        <ItemList changeSearchParams={(): void => {}} />
      </AppContextProvider>
    );

    expect(screen.queryAllByText('Show details').length).toBe(1);
  });

  test('renders correctly with empty data', () => {
    const { queryByText } = render(
      <AppContextProvider
        value={{
          items: [],
          searchQuery: '',
        }}
      >
        <ItemList changeSearchParams={(): void => {}} />
      </AppContextProvider>
    );
    expect(queryByText('Finduilas')).toBeNull();
    expect(queryByText('Fingon')).toBeNull();
  });
});
