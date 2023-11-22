import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import Button from '../Button/Button';
import styles from './ErrorBlock.module.css';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon.svg';

const ErrorBlock = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className={styles['error-block']}>
      <Image className={styles['img']} src={ringIcon} alt="Error" width={200} height={200} priority={false} />
      <h1>
        Something went wrong <br />
        ErrorBoundary worked!
      </h1>
      <Button
        onClick={(): void => {
          router.replace('/page/1');
        }}
      >
        To first page
      </Button>
    </div>
  );
};

export default ErrorBlock;
