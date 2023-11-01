import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import { ACCESS_KEY, BASE_PATH, ITEMS_PER_PAGE, PAGINATION, SEARCH_PATH } from '../../API/constants';
import Loader from '../../components/Loader/Loader';
import ItemsNotFound from '../../components/ItemsNotFound/ItemsNotFound';
import Button from '../../components/Button/Button';
import styles from './CharacterPage.module.css';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { getPageCount } from '../../utils/pages';

const CharactersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(
    async (searchStr: string) => {
      setIsLoading(true);
      // const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=${searchStr}&${PAGINATION}=${page}&limit=3`);
      const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=/${searchStr}/i&${PAGINATION}=${page}`, {
        headers: { Authorization: `Bearer ${ACCESS_KEY}` },
      });
      const data = await res.json();
      console.log(data);
      const pageCount = getPageCount(data.count, ITEMS_PER_PAGE);
      setItems(data.docs);
      setTotalPage(pageCount);
      setIsLoading(false);
    },
    [page]
  );

  useEffect(() => {
    const searchStr = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchStr) {
      setSearchQuery(searchStr);
    }
    fetchData(searchStr);
  }, [fetchData]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getSearch = () => {
    localStorage.setItem('query', searchQuery);
    setPage(1);
    fetchData(searchQuery);
  };

  const throwErrorBoundary = () => {
    setIsErrorBoundary(true);
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  if (isErrorBoundary) {
    throw new Error('ErrorBoundary worked!');
  }

  return (
    <div className={styles['wrapper']}>
      <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
      <Button onClick={throwErrorBoundary}>Throw error</Button>
      {isLoading ? (
        <Loader />
      ) : items.length > 0 ? (
        <>
          <ItemList items={items} />
          {totalPage > 1 ? <Pagination page={page} totalPage={totalPage} changePage={changePage} /> : ''}
        </>
      ) : (
        <ItemsNotFound />
      )}
    </div>
  );
};

export default CharactersPage;
