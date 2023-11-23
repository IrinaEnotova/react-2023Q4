import { FormEvent, useRef, JSX } from 'react';
import Button from '../Button/Button';
import { useAppDispatch } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import styles from './LimitHandler.module.css';
import { useRouter } from 'next/router';
import { DEFAULT_LIMIT } from '@/API/constants';

const LimitHandler = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    dispatch(itemsSlice.actions.pageChanging(1));
    router.push(`/page/1`);
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
