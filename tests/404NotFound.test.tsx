import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import NotFound from '../components/NotFound/NotFound';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

describe('404 Not Found component', () => {
  test('is displayed when navigating to an invalid route', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/someinvalidroute']}>
          <Routes>
            <Route path="/" element={<CharactersPage />}>
              <Route path="/page/:id" element={<CharactersPage />} />
            </Route>
            <Route path="*" element={<NotFound>Page was not found</NotFound>}></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page was not found')).toBeInTheDocument();
  });
});
