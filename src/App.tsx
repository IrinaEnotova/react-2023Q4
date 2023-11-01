import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import DetailedPage from './pages/DetailedPage/DetailedPage';

const App = () => {
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
    },
    {
      path: '/characters/:id',
      element: <DetailedPage />,
      errorElement: <ErrorBlock />,
      // children: [{ path: '/search/:id', element: , errorElement: <ErrorBlock /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
