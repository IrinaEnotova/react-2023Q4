import { FC } from 'react';
import Button from '../Button/Button';
import styles from './UncontrolledResult.module.css';
import { Link } from 'react-router-dom';

const UncontrolledResult: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Uncontrolled</h2>
      <div className={styles.btns}>
        <Link to="/uncontrolled">
          <Button>Go to form</Button>
        </Link>
      </div>
    </div>
  );
};

export default UncontrolledResult;
