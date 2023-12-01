import { forwardRef } from 'react';
import styles from './InputBlock.module.css';
import { InputProps } from './InputBlock.props';

export const InputBlock = forwardRef<HTMLInputElement, InputProps>(function MyInput(props, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>{props.inputName}</span>
        <input ref={ref} className={styles.input} type={props.type} placeholder={props.placeholder} />
      </label>
      <div className="error-message">{props.errorValue}</div>
    </div>
  );
});
