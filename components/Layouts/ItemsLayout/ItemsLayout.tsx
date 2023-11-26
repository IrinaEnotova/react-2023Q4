import styles from '../../../styles/Home.module.css';
import ItemList from '../../ItemList/ItemList';
import { getPageCount } from '../../../utils/pages';
import Search from '../../Search/Search';
import LimitHandler from '../../SelectLimit/LimitHandler';
import { ItemsLayoutProps } from './ItemsLayout.props';
import { useRouter } from 'next/router';
import Pagination from '../../Pagination/Pagination';
import MainLayout from '../MainLayout/MainLayout';
import { FIRST_PAGE } from '../../../API/constants';

const ItemsLayout = ({ data, children }: ItemsLayoutProps): JSX.Element => {
  const router = useRouter();
  const limit = router.query.limit ? +router.query.limit : 12;
  const totalPages = getPageCount(data.total, limit);
  const page = data.page;

  const changePage = (page: number): void => {
    const pathnameArray = router.asPath.split(/\?|&/).map((item) => item.replaceAll('&', ''));
    const currentQuery = pathnameArray
      .filter((item: string, idx) => !item.includes('character') && idx !== 0 && item)
      .join('&');
    router.push(`/page/${page}?${currentQuery}`);
  };

  const getSearch = (searchValue: string): void => {
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
        {totalPages > FIRST_PAGE && page <= totalPages && (
          <Pagination totalPages={totalPages} page={page} changePage={changePage} />
        )}
      </div>
      {children}
    </MainLayout>
  );
};

export default ItemsLayout;
