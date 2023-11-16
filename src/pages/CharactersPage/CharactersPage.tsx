import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { JSX, useEffect } from 'react';
import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import LimitHandler from '../../components/SelectLimit/LimitHandler';
import NotFound from '../../components/NotFound/NotFound';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import { useGetItemsQuery } from '../../API/itemsService';
import { getPageCount } from '../../utils/pages';
import styles from './CharacterPage.module.css';

const CharactersPage = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { searchQuery, limit, totalPages, page, isDetailsOpen } = useAppSelector((state) => state.itemsReducer);
  const { data, isItemsLoading, isItemsFetching, isItemsError, isItemsSuccess } = useGetItemsQuery(
    {
      searchStr: searchQuery,
      page: page,
      limit: limit,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, isError, isSuccess }) => ({
        data: data,
        isItemsLoading: isLoading,
        isItemsFetching: isFetching,
        isItemsError: isError,
        isItemsSuccess: isSuccess,
      }),
    }
  );

  useEffect(() => {
    if (params.id && +params.id !== page) {
      dispatch(itemsSlice.actions.pageChanging(Number(params.id)));
    }
    if (isItemsLoading || isItemsFetching) {
      dispatch(itemsSlice.actions.isAllItemsLoadingChanging(true));
    }
    if (isItemsSuccess) {
      dispatch(
        itemsSlice.actions.allItemsFetching({
          payloadItems: data.docs,
          payloadTotalPages: getPageCount(data.total, limit),
          payloadIsAllItemsLoading: false,
        })
      );
    }
  }, [data, isItemsLoading, isItemsFetching, isItemsSuccess]);

  const changePage = (page: number): void => {
    dispatch(itemsSlice.actions.pageChanging(page));
    navigate(`/page/${page}`);
  };

  const getSearch = (searchValue: string): void => {
    localStorage.setItem('query', searchValue);
    changePage(1);
  };

  if (isItemsError) {
    throw new Error('Fetch error catched! Try later!');
  }
  if (isNaN(page)) {
    return <NotFound>Page was not found</NotFound>;
  }
  return (
    <>
      <div className={styles['wrapper']}>
        <div className={styles['items-filters']}>
          <LimitHandler />
          <Search getSearch={getSearch} />
        </div>
        {isItemsLoading || isItemsFetching ? (
          <Loader />
        ) : (
          <>
            <ItemList />
            {totalPages > 1 && page <= totalPages && <Pagination changePage={changePage} />}
          </>
        )}
      </div>
      {isDetailsOpen && <Outlet />}
    </>
  );
};

export default CharactersPage;
