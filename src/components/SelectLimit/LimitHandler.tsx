import { FormEvent, useRef, useState, JSX } from 'react';
import styles from './LimitHandler.module.css';
import { LimitHandlerProps } from './LimitHandlerProps';
import Button from '../Button/Button';

const LimitHandler = ({ changeLimit }: LimitHandlerProps): JSX.Element => {
  const [value, setValue] = useState('12');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      changeLimit(Number(inputRef.current.value));
    } else {
      changeLimit(12);
    }
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
