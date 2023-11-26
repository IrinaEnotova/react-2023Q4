import { JSX } from 'react';
import ItemProps from './Item.props';
import Button from '../Button/Button';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon-gold.svg';
import { useRouter } from 'next/router';
import styles from './Item.module.css';

const Item = ({ item: { name, _id } }: ItemProps): JSX.Element => {
  const router = useRouter();
  const pathname = router.asPath.split('?')[0];
  const searchParams = router.query;

  return (
    <div className={styles['item']}>
      <div className={styles['heading-wrapper']}>
        <Image src={ringIcon} alt="Ring" width={30} height={30} priority={false} />
        <h2 className={styles['heading']}>{name}</h2>
      </div>
      <Button
        onClick={(): void => {
          searchParams['character'] = _id;
          delete searchParams.pageId;
          let resultQuery = '';
          Object.entries(searchParams).forEach((query) => (resultQuery += `${query[0]}=${query[1]}&`));
          router.push(`${pathname}?${resultQuery}`);
        }}
      >
        Show details
      </Button>
    </div>
  );
};

export default Item;
