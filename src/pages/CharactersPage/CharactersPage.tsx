import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import ItemsNotFound from '../../components/ItemsNotFound/ItemsNotFound';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { getPageCount } from '../../utils/pages';
import fetchItems from '../../API/fetchItems';
import { useNavigate, useParams } from 'react-router-dom';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import styles from './CharacterPage.module.css';

const CharactersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const params = useParams();
  const navigate = useNavigate();

  const handleItems = useCallback(
    async (searchStr: string) => {
      setIsLoading(true);
      const data = await fetchItems(searchStr, page, limit);
      const pageCount = getPageCount(data.total, limit);
      setItems(data.docs);
      setTotalPage(pageCount);
      setIsLoading(false);
    },
    [page, limit]
  );

  useEffect(() => {
    if (params.id) {
      setPage(Number(params.id));
    }
    const searchStr = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchStr) {
      setSearchQuery(searchStr);
    }
    handleItems(searchStr);
  }, [handleItems, params]);

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getSearch = () => {
    localStorage.setItem('query', searchQuery);
    navigate(`/page/1`);
    handleItems(searchQuery);
  };

  const changePage = (page: number) => {
    setPage(page);
    navigate(`/page/${page}`);
  };

  const changeLimit = (limitValue: number) => {
    navigate(`/page/1`);
    setLimit(limitValue);
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['items-filters']}>
        <LimitHandler changeLimit={changeLimit} />
        <Search searchQuery={searchQuery} handleChange={handleSearchQuery} getSearch={getSearch} />
      </div>
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
