import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '../components/ItemList/ItemList';
import ApiItem from '../interfaces/interfaces';
import { renderWithProviders } from './utils/test-utils';

describe('ItemList component', () => {
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

    const { getByText } = renderWithProviders(<ItemList items={items} />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
          items: items,
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isErrorBoundary: false,
        },
      },
    });

    for (const item of items) {
      const nameElement = getByText(item.name);
      expect(nameElement).toBeInTheDocument();
    }

    expect(screen.queryAllByText('Show details').length).toBe(2);
  });

  test('renders one card with specific content', () => {
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

    renderWithProviders(<ItemList items={items} />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
          items: items,
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isErrorBoundary: false,
        },
      },
    });

    expect(screen.queryAllByText('Show details').length).toBe(1);
    expect(screen.getByRole('heading')).toHaveTextContent('Finduilas');
    expect(screen.getByRole('button')).toHaveTextContent('Show details');
  });

  test('renders correctly with empty data', () => {
    renderWithProviders(<ItemList items={[]} />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
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
    expect(screen.queryAllByText('Show details').length).toBe(0);
    expect(screen.getByRole('heading')).toHaveTextContent('Characters were not found');
  });
});
