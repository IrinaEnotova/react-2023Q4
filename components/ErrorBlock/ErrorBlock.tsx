import { useRouter } from 'next/router';
import { JSX } from 'react';
import Button from '../Button/Button';
import styles from './ErrorBlock.module.css';
import commonStyles from '@/styles/Home.module.css';
import Image from 'next/image';
import ringIcon from '../../public/images/item-icon.svg';
import { Montserrat } from 'next/font/google';
import classNames from 'classnames';
const montserrat = Montserrat({ subsets: ['latin'] });

const ErrorBlock = (): JSX.Element => {
  const router = useRouter();

  return (
    <main className={classNames(commonStyles.main, montserrat.className)}>
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
    </main>
  );
};

export default ErrorBlock;
