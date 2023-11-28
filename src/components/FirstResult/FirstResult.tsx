import { FC } from 'react';
import Button from '../Button/Button';
import styles from './FirstResult.module.css';

const FirstResult: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Uncontrolled components</h2>
      <div className={styles.btns}>
        <Button>Go to page</Button>
        <Button>Clear data below</Button>
      </div>
    </div>
  );
};

export default FirstResult;
