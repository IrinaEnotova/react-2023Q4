import { Component, ReactNode } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): ReactNode {
    return (
      <div className={styles['loader-wrapper']}>
        <div className={styles['loader']}>
          <span></span>
        </div>
      </div>
    );
  }
}

export default Loader;
