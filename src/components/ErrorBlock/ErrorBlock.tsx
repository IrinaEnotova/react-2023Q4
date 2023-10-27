import { Component, ReactNode } from 'react';
import styles from './ErrorBlock.module.css';

class ErrorBlock extends Component {
  render(): ReactNode {
    return (
      <div className={styles['error-block']}>
        <img src="r2-d2.svg" alt="Error" />
        <h1>Something went wrong - ErrorBoundary worked!</h1>
      </div>
    );
  }
}

export default ErrorBlock;
