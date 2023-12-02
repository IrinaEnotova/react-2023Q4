import classNames from 'classnames';
import styles from './InputConfirmation.module.css';
import { FC } from 'react';
import { InputHookProps } from '../InputHookProps.props';

export const InputConfirmation: FC<InputHookProps> = ({ register, errors }) => {
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
