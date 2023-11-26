import styles from '../../../styles/Home.module.css';
import ItemList from '../../ItemList/ItemList';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { itemsSlice } from '../../../store/reducers/ItemsSlice';
import { getPageCount } from '../../../utils/pages';
import Search from '../../Search/Search';
import LimitHandler from '../../SelectLimit/LimitHandler';
import { ItemsLayoutProps } from './ItemsLayout.props';
import { useRouter } from 'next/router';
import Pagination from '../../Pagination/Pagination';
import MainLayout from '../MainLayout/MainLayout';
import { FIRST_PAGE } from '../../../API/constants';
import { useEffect } from 'react';

const ItemsLayout = ({ data, children }: ItemsLayoutProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const limit = router.query.limit ? +router.query.limit : 12;
  const totalPages = getPageCount(data.total, limit);
  const { page } = useAppSelector((state) => state.itemsReducer);
  useEffect(() => {
    dispatch(
      itemsSlice.actions.allItemsFetching({
        payloadItems: data.docs,
        payloadTotalPages: totalPages,
      })
    );
  }, []);

  const changePage = (page: number): void => {
    dispatch(itemsSlice.actions.pageChanging(page));
    const currentQuery = router.asPath.split('?')[1];
    router.push(`/page/${page}?${currentQuery}`);
  };

  const getSearch = (searchValue: string): void => {
    dispatch(itemsSlice.actions.pageChanging(FIRST_PAGE));
    dispatch(itemsSlice.actions.searchQueryChanging(searchValue));
    const pathnameArray = router.asPath.split(/\?|&/).map((item) => item.replaceAll('&', ''));
    const currentQuery = pathnameArray
      .filter((item: string, idx) => !item.includes('search') && idx !== 0 && !item.includes('character'))
      .join('&');
    router.push(`/page/1?${currentQuery}&search=${searchValue}`);
  };

  return (
    <MainLayout>
      <div className={styles['wrapper']}>
        <div className={styles['items-filters']}>
          <LimitHandler />
          <Search getSearch={getSearch} />
        </div>
        <ItemList items={data.docs} />
        {totalPages > 1 && page <= totalPages && <Pagination changePage={changePage} />}
      </div>
      {children}
    </MainLayout>
  );
};

export default ItemsLayout;
