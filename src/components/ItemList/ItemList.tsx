import { JSX, useContext } from 'react';
import Item from '../Item/Item';
import NotFound from '../NotFound/NotFound';
import styles from './ItemList.module.css';
import { AppContext } from '../../context/AppContext';

const ItemList = (): JSX.Element => {
  const { currentState } = useContext(AppContext);

  return (
    <div className={styles['wrapper']}>
      {currentState.items.length > 0 ? (
        currentState.items.map((item) => <Item key={item._id} item={item} />)
      ) : (
        <NotFound>Characters were not found</NotFound>
      )}
    </div>
  );
};

export default ItemList;
