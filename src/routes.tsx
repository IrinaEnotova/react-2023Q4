import ErrorBlock from './components/ErrorBlock/ErrorBlock';
import NotFound from './components/NotFound/NotFound';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import DetailedPage from './pages/DetailedPage/DetailedPage';

const routes = [
  {
    path: '/',
    element: <CharactersPage />,
    errorElement: <ErrorBlock />,
    children: [{ path: '', element: <DetailedPage />, errorElement: <ErrorBlock /> }],
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
];

export default routes;
