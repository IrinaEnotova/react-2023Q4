import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utils/test-utils';
import { mockItems } from './mocks/mockItems';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import CurrentPage from '../pages/page/[pageId]';
import { mockData, mockDataDetails } from './mocks/mockData';
import mockRouter from 'next-router-mock';

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <CurrentPage data={mockData} dataDetails={mockDataDetails} />
      </MemoryRouterProvider>,
      {
        preloadedState: {
          itemsReducer: {
            searchQuery: '',
            items: mockItems,
            page: 1,
            totalPages: 10,
            limit: 12,
            isDetailsOpen: false,
            detailedItem: null,
            isErrorBoundary: false,
          },
        },
      }
    );

    expect((await screen.findAllByText('Show details')).length).toBe(12);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(mockRouter.pathname).toBe('/');

    fireEvent.click(await screen.findByText('Next'));
    expect((await screen.findAllByText('Show details')).length).toBe(12);
    expect(mockRouter.pathname).toBe('/page/2');
  });
});
