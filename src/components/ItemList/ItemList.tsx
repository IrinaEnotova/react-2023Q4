import { useRef, JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import styles from './ItemList.module.css';
import NotFound from '../NotFound/NotFound';

const ItemList = ({ items, changeSearchParams }: ItemListProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      ref={wrapperRef}
      className={styles['wrapper']}
      onClick={(event): void => {
        if (searchParams.has('character') && event.target === wrapperRef.current) {
          setSearchParams({});
        }
      }}
    >
      {items.length > 0 ? (
        items.map((item) => <Item key={item._id} item={item} changeSearchParams={changeSearchParams} />)
      ) : (
        <NotFound>Characters were not found</NotFound>
      )}
    </div>
  );
};

export default ItemList;
