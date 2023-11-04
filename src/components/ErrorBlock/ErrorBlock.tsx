import { useNavigate } from 'react-router-dom';
import { JSX } from 'react';
import Button from '../Button/Button';
import styles from './ErrorBlock.module.css';

const ErrorBlock = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles['error-block']}>
      <img className={styles['img']} src="/item-icon.svg" alt="Error" />
      <h1>
        Something went wrong <br />
        ErrorBoundary worked!
      </h1>
      <Button
        onClick={(): void => {
          navigate('/page/1');
        }}
      >
        To first page
      </Button>
    </div>
  );
};

export default ErrorBlock;
