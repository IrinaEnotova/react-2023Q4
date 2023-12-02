import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputName.module.css';

export const InputUnName = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput({ errorValue }, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Name</span>
        <input
          ref={ref}
          className={classNames(styles.input, { ['error-input']: errorValue })}
          type="text"
          autoComplete="off"
          placeholder="your name"
        />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
