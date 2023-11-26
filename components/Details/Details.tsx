import { useRouter } from 'next/router';
import { JSX } from 'react';
import Button from '../../components/Button/Button';
import NotFound from '../../components/NotFound/NotFound';
import isItemFieldExist from '../../utils/isItemFieldExist';
import styles from './Details.module.css';
import DetailsProps from './Details.props';

const Details = ({ dataDetails }: DetailsProps): JSX.Element => {
  const router = useRouter();
  const detailedItem = dataDetails.docs ? dataDetails.docs[0] : null;

  const closeDetails = (): void => {
    const pathnameArray = router.asPath.split(/\?|&/).map((item) => item.replaceAll('&', ''));
    const currentPathname = router.asPath.split('?')[0];
    const currentQuery = pathnameArray
      .filter((item: string, idx) => !item.includes('character') && idx !== 0 && item)
      .join('&');
    router.push(`${currentPathname}?${currentQuery}`);
  };

  if (!detailedItem) {
    return (
      <div className={styles['detail-wrapper']}>
        <NotFound>
          Character was not found! <br />
          <br /> <Button onClick={closeDetails}>Close details</Button>
        </NotFound>
      </div>
    );
  }

  return (
    <>
      <div className={styles['detail-wrapper']}>
        <h2 className={styles['heading']}>{detailedItem.name}</h2>
        <ul className={styles['description-list']}>
          {Object.entries(detailedItem).map(([key, value]) =>
            isItemFieldExist(value) && key !== '_id' ? (
              <li key={key} className={styles['description-item']}>
                {key.charAt(0).toUpperCase() + key.slice(1)} - {value}
              </li>
            ) : null
          )}
        </ul>
        <Button onClick={closeDetails}>Close details</Button>
      </div>
    </>
  );
};

export default Details;
