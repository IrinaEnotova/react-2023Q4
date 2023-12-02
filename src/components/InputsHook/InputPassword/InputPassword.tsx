import classNames from 'classnames';
import styles from './InputPassword.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputPasswordProps } from './InputPassword.props';

export const InputPassword: FC<InputPasswordProps> = () => {
  const [register, errors] = useRegister();

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
