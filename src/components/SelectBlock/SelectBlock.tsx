import { forwardRef } from 'react';
import styles from './SelectBlock.module.css';
import { SelectProps } from './SelectBlock.props';

export const SelectBlock = forwardRef<HTMLSelectElement, SelectProps>(function MySelect(props, ref) {
  return (
    <div>
      <label className={styles['label']}>
        <span>Gender</span>
        <select ref={ref} className={styles.input}>
          <option value="">-- Choose gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      {!!props.errorValue && <div className="error-message">{props.errorValue}</div>}
    </div>
  );
});
