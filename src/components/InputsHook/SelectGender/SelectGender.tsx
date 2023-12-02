import classNames from 'classnames';
import styles from './SelectGender.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { SelectGenderProps } from './SelectGender.props';

export const SelectGender: FC<SelectGenderProps> = () => {
  const [register, errors] = useRegister();

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
