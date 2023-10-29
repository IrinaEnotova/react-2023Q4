import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';

const App = () => {
  const router = createBrowserRouter([{ path: '/', element: <CharactersPage />, errorElement: <ErrorBlock /> }]);

  return <RouterProvider router={router} />;
};

export default App;
