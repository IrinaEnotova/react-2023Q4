import { JSX } from 'react';
import { NotFoundProps } from './NotFound.props';
import styles from './NotFound.module.css';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon.svg';

const NotFound = ({ children }: NotFoundProps): JSX.Element => {
  return (
    <div className={styles['wrapper']}>
      <Image className={styles['img']} src={ringIcon} alt="Items was not found" width={200} height={200} />
      <h2 className={styles['not-found']}>{children}</h2>
    </div>
  );
};

export default NotFound;
