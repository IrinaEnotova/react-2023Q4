import styles from '@/styles/Home.module.css';
import ItemList from '@/components/ItemList/ItemList';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useGetItemsQuery } from '@/API/itemsService';
import { useEffect } from 'react';
import { itemsSlice } from '@/store/reducers/ItemsSlice';
import { getPageCount } from '@/utils/pages';
import Search from '@/components/Search/Search';
import LimitHandler from '@/components/SelectLimit/LimitHandler';
import { ItemsLayoutProps } from './ItemsLayout.props';
import NotFound from '../../NotFound/NotFound';
import { useRouter } from 'next/router';
import Loader from '../../Loader/Loader';
import Pagination from '../../Pagination/Pagination';
import MainLayout from '../MainLayout/MainLayout';

const ItemsLayout = ({ children }: ItemsLayoutProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, limit, page, totalPages } = useAppSelector((state) => state.itemsReducer);
  const { data, isItemsLoading, isItemsFetching, isItemsSuccess, isItemsError } = useGetItemsQuery(
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
    console.log(router);
    // if (router.query.pageId) {
    //   dispatch(itemsSlice.actions.pageChanging(Number(router.query.pageId)));
    // }
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
    router.push(`/page/${page}`);
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
    <MainLayout>
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
      {children}
    </MainLayout>
  );
};

export default ItemsLayout;
