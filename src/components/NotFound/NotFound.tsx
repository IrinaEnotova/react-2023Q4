import styles from './NotFound.module.css';
import { NotFoundProps } from './NotFound.props';

const NotFound = ({ children }: NotFoundProps) => {
  return (
    <div className={styles['wrapper']}>
      <img src="/item-icon.svg" alt="Items not found" />
      <h2 className={styles['not-found']}>{children}</h2>
    </div>
  );
};

export default NotFound;
