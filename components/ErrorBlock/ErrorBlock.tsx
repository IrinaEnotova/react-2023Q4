import { useRouter } from 'next/router';
import { JSX } from 'react';
import Button from '../Button/Button';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon.svg';
import styles from './ErrorBlock.module.css';
import MainLayout from '../Layouts/MainLayout/MainLayout';

const ErrorBlock = (): JSX.Element => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className={styles['error-block']}>
        <Image className={styles['img']} src={ringIcon} alt="Error" width={200} height={200} priority={false} />
        <h1>
          Something went wrong <br />
          ErrorBoundary worked!
        </h1>
        <Button
          onClick={(): void => {
            router.reload();
          }}
        >
          To app
        </Button>
      </div>
    </MainLayout>
  );
};

export default ErrorBlock;
