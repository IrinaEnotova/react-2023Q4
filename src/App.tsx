import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HookFormPage from './pages/HookFormPage/HookFormPage';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';
import UncontrolledPage from './pages/UncontrolledPage/UncontrolledPage';
import { FC } from 'react';

const routes = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/uncontrolled',
    element: <UncontrolledPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/hook-form',
    element: <HookFormPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
