import { Component, ReactNode } from 'react';
import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import styles from './ItemList.module.css';

class ItemList extends Component<ItemListProps> {
  constructor(props: ItemListProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className={styles['wrapper']}>
        {this.props.items.map((item) => (
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
  }
}

export default ItemList;
