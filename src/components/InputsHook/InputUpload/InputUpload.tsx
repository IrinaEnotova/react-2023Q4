import classNames from 'classnames';
import styles from './InputUpload.module.css';
import useRegister from '../../../hooks/useRegister';
import { FC } from 'react';
import { InputUploadProps } from './InputUpload.props';

export const InputUpload: FC<InputUploadProps> = () => {
  const [register, errors] = useRegister();

  return (
    <div>
      <label className={styles['label']}>
        <span className={styles['image-input-btn']}>Upload image</span>
        <input
          {...register('image')}
          className={classNames(styles.input, { ['error-input']: errors.image })}
          type="file"
        />
      </label>
      <div className="error-message">{errors.image?.message}</div>
    </div>
  );
};
