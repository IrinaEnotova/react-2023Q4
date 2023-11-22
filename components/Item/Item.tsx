import { JSX } from 'react';
// import { useSearchParams } from 'react-router-dom';
import ItemProps from './Item.props';
import Button from '../Button/Button';
// import { itemsSlice } from '../../store/reducers/ItemsSlice';
// import { useAppDispatch } from '../../hooks/redux';
import styles from './Item.module.css';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon-gold.svg';

const Item = ({ item }: ItemProps): JSX.Element => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (searchParams.has('character')) {
  //     dispatch(itemsSlice.actions.isDetailsOpenChanging(true));
  //   } else {
  //     dispatch(itemsSlice.actions.isDetailsOpenChanging(false));
  //   }
  // }, [searchParams]);

  return (
    <div className={styles['item']}>
      <div className={styles['heading-wrapper']}>
        <Image src={ringIcon} alt="Ring" width={30} priority={false} />
        <h2 className={styles['heading']}>{item.name}</h2>
      </div>
      <Button
        onClick={(): void => {
          // setSearchParams({ character: item._id });
        }}
      >
        Show details
      </Button>
    </div>
  );
};

export default Item;
