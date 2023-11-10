import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, JSX, useCallback, useContext } from 'react';
import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import NotFound from '../../components/NotFound/NotFound';
import useFetchData from '../../hooks/useFetchData';
import ApiItem from '../../interfaces/interfaces';
import { AppContext } from '../../context/AppContext';
import styles from './CharacterPage.module.css';

const CharactersPage = (): JSX.Element => {
  const { currentState, setCurrentState } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const changeSearchQuery = useCallback((newQuery: string): void => {
    setCurrentState({ ...currentState, searchQuery: newQuery });
  }, []);
  const changePageNumber = useCallback((page: number): void => {
    setPage(page);
  }, []);
  const changeItems = useCallback((items: ApiItem[]): void => {
    setCurrentState({ ...currentState, items: items });
  }, []);

  const [isLoading, totalPage, isError, handleItems] = useFetchData(
    limit,
    page,
    changeSearchQuery,
    changePageNumber,
    changeItems
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const changePage = (page: number): void => {
    setPage(page);
    navigate(`/page/${page}`);
  };

  const changeLimit = (limitValue: number): void => {
    navigate(`/page/1`);
    setLimit(limitValue);
  };

  const getSearch = (searchValue: string): void => {
    localStorage.setItem('query', searchValue);
    changePage(1);
    handleItems(searchValue, 1);
  };

  if (isError) {
    throw new Error('Fetch error catched! Try later!');
  }
  if (isNaN(page)) {
    return <NotFound>Page was not found</NotFound>;
  }
  return (
    <>
      <div className={styles['wrapper']}>
        <div className={styles['items-filters']}>
          <LimitHandler changeLimit={changeLimit} />
          <Search getSearch={getSearch} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ItemList />
            {totalPage > 1 && page <= totalPage && (
              <Pagination page={page} totalPage={totalPage} changePage={changePage} />
            )}
          </>
        )}
      </div>
      {searchParams.has('character') && <Outlet />}
    </>
  );
};

export default CharactersPage;
