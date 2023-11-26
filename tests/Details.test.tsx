import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utils/test-utils';
import { mockItems } from './mocks/mockItems';
import CurrentPage from '../pages/page/[pageId]';
import { mockData } from './mocks/mockData';

describe('DetailedPage component', () => {
  beforeEach(async () => {
    renderWithProviders(<CurrentPage data={mockData} />, {
      preloadedState: {
        itemsReducer: {
          searchQuery: '',
          items: mockItems,
          page: 1,
          totalPages: 1,
          limit: 12,
          isDetailsOpen: false,
          detailedItem: null,
          isErrorBoundary: false,
        },
      },
    });

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
    fireEvent.click(await screen.findByText('Close details'));
    const searchParams = new URLSearchParams(location.search);
    const character = searchParams.get('character');
    expect(character).toBeNull();
    expect(screen.queryByText(/Close details/i)).not.toBeInTheDocument();
  });
});
