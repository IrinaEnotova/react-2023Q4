import classNames from 'classnames';
import styles from './InputPassword.module.css';
import { FC } from 'react';
import { InputHookProps } from '../InputHookProps.props';

export const InputPassword: FC<InputHookProps> = ({ register, errors }) => {
  return (
    <div>
      <label className={styles['label']}>
        <span>Password</span>
        <input
          {...register('password')}
          className={classNames(styles.input, { ['error-input']: errors.password })}
          type="text"
          placeholder="password"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errors.password?.message}</div>
    </div>
  );
};
