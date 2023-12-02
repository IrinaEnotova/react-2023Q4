import classNames from 'classnames';
import styles from './InputName.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputNameProps } from './InputName.props';

export const InputName: FC<InputNameProps> = () => {
  const [register, errors] = useRegister();

  return (
    <div>
      <label className={styles['label']}>
        <span>Name</span>
        <input
          {...register('name')}
          className={classNames(styles.input, { ['error-input']: errors.name })}
          type="text"
          placeholder="your name"
        />
      </label>
      <div className="error-message">{errors.name?.message}</div>
    </div>
  );
};
