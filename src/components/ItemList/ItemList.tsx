import { JSX } from 'react';
import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import NotFound from '../NotFound/NotFound';
import styles from './ItemList.module.css';

const ItemList = ({ items, changeSearchParams }: ItemListProps): JSX.Element => {
  return (
    <div className={styles['wrapper']}>
      {items.length > 0 ? (
        items.map((item) => <Item key={item._id} item={item} changeSearchParams={changeSearchParams} />)
      ) : (
        <NotFound>Characters were not found</NotFound>
      )}
    </div>
  );
};

export default ItemList;
