import { FormEvent, useRef, useState, JSX } from 'react';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import styles from './LimitHandler.module.css';

const LimitHandler = (): JSX.Element => {
  const [value, setValue] = useState('12');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      changeLimit(Number(inputRef.current.value));
    } else {
      changeLimit(12);
    }
  };

  const changeLimit = (limitValue: number): void => {
    dispatch(itemsSlice.actions.limitChanging(limitValue));
    navigate(`/page/1`);
  };

  return (
    <form className={styles['form']} onSubmit={submit}>
      <input
        className={styles['input']}
        ref={inputRef}
        type="number"
        min={0}
        placeholder="Standart limit = 12"
        value={value}
        onChange={(event): void => setValue(event.target.value)}
      />
      <Button>Change limit</Button>
    </form>
  );
};

export default LimitHandler;
