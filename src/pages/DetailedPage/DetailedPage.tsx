import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, JSX } from 'react';
import fetchItemById from '../../API/fetchItemById';
import ApiItem from '../../interfaces/interfaces';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import styles from './DetailedPage.module.css';
import isItemFieldExist from '../../utils/isItemFieldExist';

const DetailedPage = (): JSX.Element => {
  const [item, setItem] = useState<ApiItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const itemId = searchParams.get('character');

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      const itemData = await fetchItemById(itemId!);
      if (itemData && 'docs' in itemData) {
        setIsError(false);
        setItem(itemData.docs[0]);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [itemId]);

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
