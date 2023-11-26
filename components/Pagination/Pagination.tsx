import { JSX } from 'react';
import Button from '../Button/Button';
import { PaginationProps } from './Pagination.props';
import { FIRST_PAGE } from '../../API/constants';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, page, changePage }: PaginationProps): JSX.Element => {
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
