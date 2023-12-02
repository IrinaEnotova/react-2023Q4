import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputAge.module.css';

export const InputUnAge = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput({ errorValue }, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Age</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: errorValue })}
          type="number"
          placeholder="your age"
        />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
