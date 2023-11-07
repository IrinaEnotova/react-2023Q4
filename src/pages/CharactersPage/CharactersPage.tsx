import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, JSX, useCallback } from 'react';
import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import NotFound from '../../components/NotFound/NotFound';
import styles from './CharacterPage.module.css';
import useFetchData from '../../hooks/useFetchData';

const CharactersPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const changeSearchQuery = useCallback((newQuery: string): void => {
    setSearchQuery(newQuery);
  }, []);

  const changePageNumber = useCallback((page: number): void => {
    setPage(page);
  }, []);

  const [items, isLoading, totalPage, isError, handleItems] = useFetchData(
    limit,
    page,
    changeSearchQuery,
    changePageNumber
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/page/1');
    }
  }, [location, navigate]);

  const handleSearchQuery = (query: string): void => {
    setSearchQuery(query);
  };

  const getSearch = (): void => {
    localStorage.setItem('query', searchQuery);
    navigate(`/page/1`);
    handleItems(searchQuery, page);
  };

  const changePage = (page: number): void => {
    setPage(page);
    navigate(`/page/${page}`);
  };

  const changeLimit = (limitValue: number): void => {
    navigate(`/page/1`);
    setLimit(limitValue);
  };

  const changeSearchParams = (characterId: string): void => {
    setSearchParams({ character: characterId });
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
          <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ItemList items={items} changeSearchParams={changeSearchParams} />
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
