import classNames from 'classnames';
import styles from './InputConfirmation.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputConfirmationProps } from './InputConfirmation.props';

export const InputConfirmation: FC<InputConfirmationProps> = () => {
  const [register, errors] = useRegister();

  return (
    <div>
      <label className={styles['label']}>
        <span>Confirm password</span>
        <input
          {...register('confirmPassword')}
          className={classNames(styles.input, { ['error-input']: errors.confirmPassword })}
          type="text"
          placeholder="confirmation"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errors.confirmPassword?.message}</div>
    </div>
  );
};
