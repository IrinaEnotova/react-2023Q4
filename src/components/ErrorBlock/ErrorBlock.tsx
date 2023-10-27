import styles from './ErrorBlock.module.css';

const ErrorBlock = () => {
  return (
    <div className={styles['error-block']}>
      <img src="r2-d2.svg" alt="Error" />
      <h1>Something went wrong - ErrorBoundary worked!</h1>
    </div>
  );
};

export default ErrorBlock;
