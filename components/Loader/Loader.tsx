import { JSX } from 'react';
import styles from './Loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <>
      <h2 className={styles['loader-heading']}>Loading...</h2>
      <div className={styles['loader-wrapper']}>
        <div className={styles['loader']}>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Loader;