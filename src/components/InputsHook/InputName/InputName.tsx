import classNames from 'classnames';
import styles from './InputName.module.css';
import { FC } from 'react';
import { InputHookProps } from '../InputHookProps.props';

export const InputName: FC<InputHookProps> = ({ register, errors }) => {
  return (
    <div>
      <label className={styles['label']}>
        <span>Name</span>
        <input
          {...register('name')}
          className={classNames(styles.input, { ['error-input']: errors.name })}
          type="text"
          placeholder="your name"
          autoComplete="off"
        />
      </label>
      <div className="error-message">{errors.name?.message}</div>
    </div>
  );
};
