import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import styles from './ItemList.module.css';

const ItemList = ({ items }: ItemListProps) => {
  return (
    <div className={styles['wrapper']}>
      {items.map((item) => (
        <Item
          key={item.created}
          name={item.name}
          gender={item.gender}
          height={item.height}
          mass={item.mass}
          birthYear={item.birth_year}
        />
      ))}
    </div>
  );
};

export default ItemList;
