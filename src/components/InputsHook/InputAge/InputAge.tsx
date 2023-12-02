import classNames from 'classnames';
import styles from './InputAge.module.css';
import { FC } from 'react';
import { InputHookProps } from '../InputHookProps.props';

export const InputAge: FC<InputHookProps> = ({ register, errors }) => {
  return (
    <div>
      <label className={styles['label']}>
        <span>Age</span>
        <input
          {...register('age')}
          className={classNames(styles.input, { ['error-input']: errors.age })}
          type="number"
          placeholder="your age"
          autoComplete="none"
        />
      </label>
      <div className="error-message">{errors.age?.message}</div>
    </div>
  );
};
