import { JSX } from 'react';
import Button from '../Button/Button';
import { PaginationProps } from './Pagination.props';
import { useAppSelector } from '../../hooks/redux';
import styles from './Pagination.module.css';
import { FIRST_PAGE } from '@/API/constants';

const Pagination = ({ changePage }: PaginationProps): JSX.Element => {
  const { totalPages, page } = useAppSelector((state) => state.itemsReducer);

  const handlePrevPage = (): void => {
    if (page > FIRST_PAGE) {
      changePage(page - 1);
    }
  };

  const handleNextPage = (): void => {
    if (page < totalPages) {
      changePage(page + 1);
    }
  };

  if (totalPages === 0) {
    return <></>;
  }
  return (
    <div className={styles['pages']}>
      <Button className={styles.action} onClick={handlePrevPage} disabled={page <= 1}>
        Prev
      </Button>
      <span className={styles['page']}>{page}</span>
      <Button className={styles.action} onClick={handleNextPage} disabled={page >= totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
