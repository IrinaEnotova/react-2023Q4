import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputEmail.module.css';

export const InputUnEmail = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput({ errorValue }, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Email</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: errorValue })}
          type="text"
          placeholder="email@email.com"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
