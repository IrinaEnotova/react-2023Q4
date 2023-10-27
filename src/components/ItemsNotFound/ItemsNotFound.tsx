import { Component, ReactNode } from 'react';
import styles from './ItemsNotFound.module.css';

class ItemsNotFound extends Component {
  render(): ReactNode {
    return (
      <div className={styles['wrapper']}>
        <img src="./r2-d2.svg" alt="Items not found" />
        <h2 className={styles['not-found']}>
          Characters were not found! <br /> Enter another name
        </h2>
      </div>
    );
  }
}

export default ItemsNotFound;
