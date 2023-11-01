import { FormEvent, useRef, useState } from 'react';
import styles from './LimitHandler.module.css';
import { LimitHandlerProps } from './LimitHandlerProps';
import Button from '../Button/Button';

const LimitHandler = ({ changeLimit }: LimitHandlerProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value) {
      changeLimit(Number(inputRef.current.value));
    } else {
      changeLimit(9);
    }
  };

  return (
    <form className={styles['form']} onSubmit={submit}>
      <input
        className={styles['input']}
        ref={inputRef}
        type="number"
        min={0}
        placeholder="Standart limit = 9"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button>Change limit</Button>
    </form>
  );
};

export default LimitHandler;
