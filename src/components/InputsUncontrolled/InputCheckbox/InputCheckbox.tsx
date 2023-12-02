import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputCheckbox.module.css';

export const InputUnCheckbox = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput(
  { errorValue },
  ref
) {
  return (
    <div className={styles['checkbox-block']}>
      <label className={styles['checkbox-label']}>
        <input ref={ref} className={classNames({ ['error-input']: errorValue })} type="checkbox" />
        <span>I agree to terms and conditions</span>
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
