import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import { BASE_PATH, SEARCH_PATH } from '../../API/constants';
// import { CharacterPageState } from '../../interfaces/interfaces';
import Loader from '../../components/Loader/Loader';
import ItemsNotFound from '../../components/ItemsNotFound/ItemsNotFound';
import Button from '../../components/Button/Button';
import styles from './CharacterPage.module.css';
import { useEffect, useState } from 'react';

const CharactersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);

  useEffect(() => {
    const searchStr = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchStr) {
      setSearchQuery(searchStr);
    }
    fetchData(searchStr);
  }, []);

  const fetchData = async (searchStr: string) => {
    setIsLoading(true);
    const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=${searchStr}`);
    const data = await res.json();
    setItems(data.results);
    setIsLoading(false);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getSearch = () => {
    localStorage.setItem('query', searchQuery);
    fetchData(searchQuery);
  };

  const throwErrorBoundary = () => {
    setIsErrorBoundary(true);
  };

  if (isErrorBoundary) {
    throw new Error('ErrorBoundary worked!');
  }
  return (
    <div className={styles['wrapper']}>
      <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
      <Button onClick={throwErrorBoundary}>Throw error</Button>
      {isLoading ? <Loader /> : items.length > 0 ? <ItemList items={items} /> : <ItemsNotFound />}
    </div>
  );
};

export default CharactersPage;
