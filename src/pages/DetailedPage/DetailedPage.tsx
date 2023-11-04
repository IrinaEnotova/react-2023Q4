import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, JSX } from 'react';
import fetchItemById from '../../API/fetchItemById';
import ApiItem from '../../interfaces/interfaces';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import styles from './DetailedPage.module.css';

const DetailedPage = (): JSX.Element => {
  const [item, setItem] = useState<ApiItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const itemId = searchParams.get('character');

  const isBirth = !!item?.birth && item.birth !== 'NaN';
  const isGender = !!item?.gender && item.gender !== 'NaN';
  const isHair = !!item?.hair && item.hair !== 'NaN';
  const isHeight = !!item?.height && item.height !== 'NaN';
  const isRace = !!item?.race && item.race !== 'NaN';
  const isRealm = !!item?.realm && item.realm !== 'NaN';
  const isWikiUrl = !!item?.wikiUrl && item.wikiUrl !== 'NaN';

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      const itemData = await fetchItemById(itemId!);
      if (itemData && 'docs' in itemData) {
        setIsError(false);
        setItem(itemData.docs[0]);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [itemId]);

  return (
    <>
      {isLoading ? (
        <div className={styles['detail-wrapper']}>
          <Loader />
        </div>
      ) : isError ? (
        <NotFound>Character was not found!</NotFound>
      ) : (
        <div className={styles['detail-wrapper']}>
          <div className={styles['close-btn']}></div>
          {item ? (
            <>
              <h2 className={styles['heading']}>{item.name}</h2>
              <ul className={styles['description-list']}>
                {isBirth && <li className={styles['description-item']}>Birth - {item.birth}</li>}
                {isGender && <li className={styles['description-item']}>Gender - {item.gender}</li>}
                {isHair && <li className={styles['description-item']}>Hair - {item.hair}</li>}
                {isHeight && <li className={styles['description-item']}>Height - {item.height}</li>}
                {isRace && <li className={styles['description-item']}>Race - {item.race}</li>}
                {isRealm && <li className={styles['description-item']}>Realm - {item.realm}</li>}
                {isWikiUrl && (
                  <li className={styles['description-item']}>
                    <a className={styles['link']} href={item.wikiUrl} target="_blank" rel="noreferrer">
                      See in Wiki
                    </a>
                  </li>
                )}
              </ul>
            </>
          ) : (
            <h2>Item was not found!</h2>
          )}
          <Button
            onClick={(): void => {
              setSearchParams({});
            }}
          >
            Close details
          </Button>
        </div>
      )}
    </>
  );
};

export default DetailedPage;
