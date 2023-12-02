import { FC } from 'react';
import Button from '../Button/Button';
import styles from './HookFormResult.module.css';
import { Link } from 'react-router-dom';

const HookFormResult: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>React Hook Form</h2>
      <div className={styles.btns}>
        <Link to="/hook-form">
          <Button>Go to form</Button>
        </Link>
      </div>
    </div>
  );
};

export default HookFormResult;
