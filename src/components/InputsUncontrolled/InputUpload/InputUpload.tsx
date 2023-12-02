import { forwardRef } from 'react';
import classNames from 'classnames';
import { InputUncontrolledProps } from '../InputUncontrolledProps.props';
import styles from './InputUpload.module.css';

export const InputUnUpload = forwardRef<HTMLInputElement, InputUncontrolledProps>(function MyInput(
  { errorValue },
  ref
) {
  return (
    <div>
      <label className={styles['label']}>
        <span className={styles['image-input-btn']}>Upload image</span>
        <input ref={ref} className={classNames(styles.input, { ['error-input']: errorValue })} type="file" />
      </label>
      <div className="error-message">{errorValue}</div>
    </div>
  );
});
