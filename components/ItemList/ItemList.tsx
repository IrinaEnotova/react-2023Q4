import { JSX } from 'react';
import Item from '../Item/Item';
import NotFound from '../NotFound/NotFound';
import { useAppSelector } from '../../hooks/redux';
import styles from './ItemList.module.css';

const ItemList = (): JSX.Element => {
  const { items } = useAppSelector((state) => state.itemsReducer);

  if (!Array.isArray(items)) {
    return <NotFound>Invalid data</NotFound>;
  }
  if (items.length === 0) {
    return <NotFound>Characters were not found</NotFound>;
  }
  return (
    <ul className={styles['wrapper']}>
      {items.map((item) => (
        <li className={styles['list-item']} key={item._id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
