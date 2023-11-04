import { JSX } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import DetailedPage from './pages/DetailedPage/DetailedPage';
import NotFound from './components/NotFound/NotFound';

const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CharactersPage />,
      errorElement: <ErrorBlock />,
    },
    {
      path: '/page/:id',
      element: <CharactersPage />,
      errorElement: <ErrorBlock />,
      children: [{ path: '', element: <DetailedPage />, errorElement: <ErrorBlock /> }],
    },
    {
      path: '*',
      element: <NotFound>Page was not found</NotFound>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
