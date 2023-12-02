import classNames from 'classnames';
import { FC } from 'react';
import { SelectHookProps } from '../SelectHookProps.props';
import styles from './SelectGender.module.css';

export const SelectGender: FC<SelectHookProps> = ({ register, errors }) => {
  return (
    <div>
      <label className={styles['label']}>
        <span>Gender</span>
        <select {...register('gender')} className={classNames(styles.input, { ['error-input']: errors.gender })}>
          <option value="">-- Choose gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <div className="error-message">{errors.gender?.message}</div>
    </div>
  );
};
