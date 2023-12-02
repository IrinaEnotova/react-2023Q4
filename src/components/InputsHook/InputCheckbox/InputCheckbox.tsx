import classNames from 'classnames';
import styles from './InputCheckbox.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputCheckboxProps } from './InputCheckbox.props';

export const InputCheckbox: FC<InputCheckboxProps> = () => {
  const [register, errors] = useRegister();

  return (
    <div className={styles['checkbox-block']}>
      <label className={styles['checkbox-label']}>
        <input
          {...register('terms')}
          className={classNames(styles.input, { ['error-input']: errors.terms })}
          type="checkbox"
        />
        <span>I agree to terms and conditions</span>
      </label>
      <div className="error-message">{errors.terms?.message}</div>
    </div>
  );
};
