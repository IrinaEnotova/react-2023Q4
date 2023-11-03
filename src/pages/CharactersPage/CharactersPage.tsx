import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { getPageCount } from '../../utils/pages';
import fetchItems from '../../API/fetchItems';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import NotFound from '../../components/NotFound/NotFound';
import styles from './CharacterPage.module.css';

const CharactersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleItems = useCallback(
    async (searchStr: string, page: number) => {
      setIsLoading(true);
      const data = await fetchItems(searchStr, page, limit);
      const pageCount = getPageCount(data.total, limit);
      setItems(data.docs);
      setTotalPage(pageCount);
      setIsLoading(false);
    },
    [limit]
  );

  useEffect(() => {
    if (params.id && +params.id !== page) {
      setPage(() => {
        return Number(params.id);
      });
    }
    const searchStr = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchStr) {
      setSearchQuery(searchStr);
    }
    handleItems(searchStr, page);
  }, [page, params.id, handleItems]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getSearch = () => {
    localStorage.setItem('query', searchQuery);
    navigate(`/page/1`);
    handleItems(searchQuery, page);
  };

  const changePage = (page: number) => {
    setPage(page);
    navigate(`/page/${page}`);
  };

  const changeLimit = (limitValue: number) => {
    navigate(`/page/1`);
    setLimit(limitValue);
  };

  const changeSearchParams = (characterId: string) => {
    setSearchParams({ character: characterId });
  };

  return (
    <>
      <div className={styles['wrapper']}>
        <div className={styles['items-filters']}>
          <LimitHandler changeLimit={changeLimit} />
          <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
        </div>
        {isLoading ? (
          <Loader />
        ) : items.length > 0 ? (
          <>
            <ItemList items={items} changeSearchParams={changeSearchParams} />
            {totalPage > 1 ? <Pagination page={page} totalPage={totalPage} changePage={changePage} /> : ''}
          </>
        ) : (
          <NotFound>Characters were not found!</NotFound>
        )}
      </div>
      {searchParams.has('character') && <Outlet />}
    </>
  );
};

export default CharactersPage;
