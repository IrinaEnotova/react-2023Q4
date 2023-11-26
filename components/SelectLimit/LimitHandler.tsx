import { FormEvent, useRef, JSX, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button/Button';
import { DEFAULT_LIMIT } from '../../API/constants';
import styles from './LimitHandler.module.css';

const LimitHandler = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.limit && typeof router.query.limit === 'string') {
      inputRef.current!.value = router.query.limit;
    }
  }, []);

  const handleLimitSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      changeLimit(Number(inputRef.current.value));
    } else {
      changeLimit(DEFAULT_LIMIT);
    }
  };

  const changeLimit = (limitValue: number): void => {
    const pathnameArray = router.asPath.split(/\?|&/).map((item) => item.replaceAll('&', ''));
    const currentQuery = pathnameArray
      .filter((item: string, idx) => !item.includes('limit') && idx !== 0 && !item.includes('character'))
      .join('&');
    router.push(`/page/1?${currentQuery}&limit=${limitValue}`);
  };

  return (
    <form className={styles['form']} onSubmit={handleLimitSubmit}>
      <input
        className={styles['input']}
        ref={inputRef}
        type="number"
        min={0}
        placeholder={`Standart limit = ${DEFAULT_LIMIT}`}
      />
      <Button>Change limit</Button>
    </form>
  );
};

export default LimitHandler;
