import { JSX } from 'react';
import { NotFoundProps } from './NotFound.props';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon.svg';
import styles from './NotFound.module.css';

const NotFound = ({ children }: NotFoundProps): JSX.Element => {
  return (
    <div className={styles['wrapper']}>
      <Image className={styles['img']} src={ringIcon} alt="Items was not found" width={150} height={150} priority />
      <h2 className={styles['not-found']}>{children}</h2>
    </div>
  );
};

export default NotFound;
