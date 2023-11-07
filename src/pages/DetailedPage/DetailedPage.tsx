import { useSearchParams } from 'react-router-dom';
import { JSX } from 'react';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import styles from './DetailedPage.module.css';
import isItemFieldExist from '../../utils/isItemFieldExist';
import useFetchItem from '../../hooks/useFetchItem';

const DetailedPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [item, isLoading, isError] = useFetchItem(searchParams);

  if (isLoading) {
    return (
      <div className={styles['detail-wrapper']}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <NotFound>Character was not found!</NotFound>;
  }

  if (!item) {
    return <h2>Character was not found!</h2>;
  }

  return (
    <div className={styles['detail-wrapper']}>
      <h2 className={styles['heading']}>{item.name}</h2>
      <ul className={styles['description-list']}>
        {Object.entries(item).map(([key, value]) =>
          isItemFieldExist(value) && key !== '_id' ? (
            <li key={key} className={styles['description-item']}>
              {key.charAt(0).toUpperCase() + key.slice(1)} - {value}
            </li>
          ) : null
        )}
      </ul>
      <Button
        onClick={(): void => {
          setSearchParams({});
        }}
      >
        Close details
      </Button>
    </div>
  );
};

export default DetailedPage;
