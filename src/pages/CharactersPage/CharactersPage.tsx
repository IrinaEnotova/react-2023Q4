import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState, JSX, MouseEvent } from 'react';
import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { getPageCount } from '../../utils/pages';
import fetchItems from '../../API/fetchItems';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import NotFound from '../../components/NotFound/NotFound';
import ApiItem from '../../interfaces/interfaces';
import styles from './CharacterPage.module.css';

const CharactersPage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleItems = useCallback(
    async (searchStr: string, page: number) => {
      setIsLoading(true);
      try {
        const data = await fetchItems(searchStr, page, limit);
        const pageCount = getPageCount(data.total, limit);
        setItems(data.docs);
        setTotalPage(pageCount);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    },
    [limit]
  );

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/page/1');
    }
  }, [location, navigate]);

  useEffect(() => {
    const searchStr = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchStr) {
      setSearchQuery(searchStr);
    }
    if (params.id && +params.id !== page) {
      setPage(() => {
        return Number(params.id);
      });
      handleItems(searchStr, Number(params.id));
    } else {
      handleItems(searchStr, page);
    }
  }, [page, params.id, handleItems]);

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

  const closeDetails = (event: MouseEvent): void => {
    if (searchParams.has('character') && event.target === wrapperRef.current) {
      setSearchParams({});
    }
  };

  if (isError) {
    throw new Error('Fetch error catched! Try later!');
  }

  return (
    <>
      {isNaN(page) ? (
        <NotFound>Page was not found</NotFound>
      ) : (
        <div ref={wrapperRef} className={styles['wrapper']} onClick={closeDetails}>
          <div className={styles['items-filters']}>
            <LimitHandler changeLimit={changeLimit} />
            <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ItemList items={items} changeSearchParams={changeSearchParams} />
              {totalPage > 1 && page <= totalPage ? (
                <Pagination page={page} totalPage={totalPage} changePage={changePage} />
              ) : (
                ''
              )}
            </>
          )}
        </div>
      )}
      {searchParams.has('character') && <Outlet />}
    </>
  );
};

export default CharactersPage;
