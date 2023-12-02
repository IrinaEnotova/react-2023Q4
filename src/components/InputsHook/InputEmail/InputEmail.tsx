import classNames from 'classnames';
import styles from './InputEmail.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputEmailProps } from './InputEmail.props';

export const InputEmail: FC<InputEmailProps> = () => {
  const [register, errors] = useRegister();

  return (
    <div>
      <label className={styles['label']}>
        <span>Email</span>
        <input
          {...register('email')}
          className={classNames(styles.input, { ['error-input']: errors.email })}
          type="text"
          placeholder="email@email.com"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errors.email?.message}</div>
    </div>
  );
};
