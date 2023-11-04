import { JSX } from 'react';
import { NotFoundProps } from './NotFound.props';
import styles from './NotFound.module.css';

const NotFound = ({ children }: NotFoundProps): JSX.Element => {
  return (
    <div className={styles['wrapper']}>
      <img src="/item-icon.svg" alt="Items not found" />
      <h2 className={styles['not-found']}>{children}</h2>
    </div>
  );
};

export default NotFound;
