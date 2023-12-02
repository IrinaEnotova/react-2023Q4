import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputPassword.module.css';

export const InputUnPassword = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput(
  { errorValue },
  ref
) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Password</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: errorValue })}
          type="text"
          placeholder="your password"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
