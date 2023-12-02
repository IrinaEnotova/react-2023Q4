import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputConfirmation.module.css';

export const InputUnConfirmation = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput(
  { errorValue },
  ref
) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Confirm password</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: errorValue })}
          type="text"
          placeholder="confirmation"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
