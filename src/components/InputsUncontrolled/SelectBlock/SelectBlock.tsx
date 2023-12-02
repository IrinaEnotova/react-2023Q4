import { forwardRef } from 'react';
import styles from './SelectBlock.module.css';
import { SelectProps } from './SelectBlock.props';
import classNames from 'classnames';

export const SelectBlock = forwardRef<HTMLSelectElement, SelectProps>(function MySelect(props, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Gender</span>
        <select ref={ref} className={classNames(styles.input, { ['error-input']: props.errorValue })}>
          <option value="">-- Choose gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <div className="error-message">{props.errorValue}</div>
    </div>
  );
});
