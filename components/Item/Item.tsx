import { JSX } from 'react';
import ItemProps from './Item.props';
import Button from '../Button/Button';
import styles from './Item.module.css';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon-gold.svg';
import { useRouter } from 'next/router';

const Item = ({ item }: ItemProps): JSX.Element => {
  const router = useRouter();
  const pathname = router.asPath.split('?')[0];
  const searchParams = router.query;

  return (
    <div className={styles['item']}>
      <div className={styles['heading-wrapper']}>
        <Image src={ringIcon} alt="Ring" width={30} priority={false} />
        <h2 className={styles['heading']}>{item.name}</h2>
      </div>
      <Button
        onClick={(): void => {
          console.log(pathname);
          searchParams['character'] = item._id;
          router.push(`${pathname}?character=${item._id}`);
        }}
      >
        Show details
      </Button>
    </div>
  );
};

export default Item;
