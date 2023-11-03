import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from '../Item/Item';
import ItemListProps from './ItemList.props';
import styles from './ItemList.module.css';

const ItemList = ({ items, changeSearchParams }: ItemListProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      ref={wrapperRef}
      className={styles['wrapper']}
      onClick={(event) => {
        if (searchParams.has('character') && event.target === wrapperRef.current) {
          setSearchParams({});
        }
      }}
    >
      {items.map((item) => (
        <Item key={item._id} item={item} changeSearchParams={changeSearchParams} />
      ))}
    </div>
  );
};

export default ItemList;
