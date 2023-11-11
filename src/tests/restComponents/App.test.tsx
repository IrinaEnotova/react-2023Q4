import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContextProvider } from '../../context/AppContext';
import App from '../../App';
import { server } from '../mocks/server';

describe('App component', () => {
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
