import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputProps } from './InputBlock.props';
import styles from './InputBlock.module.css';

export const InputBlock = forwardRef<HTMLInputElement, InputProps>(function MyInput(props, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>{props.inputName}</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: props.errorValue })}
          type={props.type}
          placeholder={props.placeholder}
        />
      </label>
      <div className="error-message">{props.errorValue}</div>
    </div>
  );
});
