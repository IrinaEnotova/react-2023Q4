import { JSX } from 'react';
import Item from '../Item/Item';
import NotFound from '../NotFound/NotFound';
import { useAppSelector } from '../../hooks/redux';
import styles from './ItemList.module.css';

const ItemList = (): JSX.Element => {
  const { items } = useAppSelector((state) => state.itemsReducer);

  return (
    <div className={styles['wrapper']}>
      {items.length > 0 ? (
        items.map((item) => <Item key={item._id} item={item} />)
      ) : (
        <NotFound>Characters were not found</NotFound>
      )}
    </div>
  );
};

export default ItemList;
