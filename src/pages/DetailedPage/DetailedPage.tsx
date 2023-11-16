import { useSearchParams } from 'react-router-dom';
import { JSX, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import isItemFieldExist from '../../utils/isItemFieldExist';
import { useGetDetailedItemQuery } from '../../API/itemsService';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import styles from './DetailedPage.module.css';

const DetailedPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { detailedItem } = useAppSelector((state) => state.itemsReducer);
  const { data, isItemLoading, isItemFetching, isItemError, isItemSuccess } = useGetDetailedItemQuery(
    searchParams.get('character'),
    {
      skip: !searchParams.has('character'),
      selectFromResult: ({ data, isLoading, isFetching, isError, isSuccess }) => ({
        data: data,
        isItemLoading: isLoading,
        isItemFetching: isFetching,
        isItemError: isError,
        isItemSuccess: isSuccess,
      }),
    }
  );

  useEffect(() => {
    if (isItemSuccess) {
      dispatch(itemsSlice.actions.detailedItemChanging(data.docs[0]));
    }
  }, [data]);

  if (isItemLoading || isItemFetching) {
    return (
      <div className={styles['detail-wrapper']}>
        <Loader />
      </div>
    );
  }

  if (isItemError) {
    return <NotFound>Character was not found!</NotFound>;
  }

  if (!detailedItem) {
    return <h2>Character was not found!</h2>;
  }

  return (
    <div className={styles['detail-wrapper']}>
      <h2 className={styles['heading']}>{detailedItem.name}</h2>
      <ul className={styles['description-list']}>
        {Object.entries(detailedItem).map(([key, value]) =>
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
          dispatch(itemsSlice.actions.detailedItemChanging(null));
        }}
      >
        Close details
      </Button>
    </div>
  );
};

export default DetailedPage;
