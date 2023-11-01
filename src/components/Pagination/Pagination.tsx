import Button from '../Button/Button';
import { PaginationProps } from './Pagination.props';
import styles from './Pagination.module.css';

const Pagination = ({ page, totalPage, changePage }: PaginationProps) => {
  const handlePrevPage = () => {
    if (page > 1) {
      changePage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      changePage(page + 1);
    }
  };

  return (
    <div className={styles['pages']}>
      <Button className={styles.action} onClick={handlePrevPage} disabled={page <= 1 ? true : false}>
        Prev
      </Button>
      <span className={styles['page']}>{page}</span>
      <Button className={styles.action} onClick={handleNextPage} disabled={page >= totalPage ? true : false}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
