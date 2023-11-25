import { FormEvent, useRef, JSX, useEffect } from 'react';
import Button from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import styles from './LimitHandler.module.css';
import { useRouter } from 'next/router';
import { DEFAULT_LIMIT, FIRST_PAGE } from '../../API/constants';

const LimitHandler = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.limit && typeof router.query.limit === 'string') {
      inputRef.current!.value = router.query.limit;
      dispatch(itemsSlice.actions.limitChanging(+router.query.limit));
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
    dispatch(itemsSlice.actions.limitChanging(limitValue));
    dispatch(itemsSlice.actions.pageChanging(FIRST_PAGE));
    const pathnameArray = router.asPath.split(/\?|&/).map((item) => item.replaceAll('&', ''));
    const currentPathname = router.asPath.split('?')[0];
    const currentQuery = pathnameArray.filter((item: string, idx) => !item.includes('limit') && idx !== 0).join('&');
    router.push(`${currentPathname}?${currentQuery}&limit=${limitValue}`);
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
