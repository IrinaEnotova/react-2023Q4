import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import styles from './ItemList.module.css';

const ItemList = ({ items, changeSearchParams }: ItemListProps) => {
  return (
    <div className={styles['wrapper']}>
      {items.map((item) => (
        <Item key={item._id} item={item} changeSearchParams={changeSearchParams} />
      ))}
    </div>
  );
};

export default ItemList;
