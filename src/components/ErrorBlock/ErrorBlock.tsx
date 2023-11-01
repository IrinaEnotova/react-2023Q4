import styles from './ErrorBlock.module.css';

const ErrorBlock = () => {
  return (
    <div className={styles['error-block']}>
      <img className={styles['img']} src="item-icon.svg" alt="Error" />
      <h1>
        Something went wrong <br />
        ErrorBoundary worked!
      </h1>
    </div>
  );
};

export default ErrorBlock;
