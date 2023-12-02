import { FC } from 'react';
import Button from '../Button/Button';
import styles from './BlockHeading.module.css';
import { Link } from 'react-router-dom';
import { BlockHeadingProps } from './BlockHeading.props';

const BlockHeading: FC<BlockHeadingProps> = ({ name, link }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      <div className={styles.btns}>
        <Link to={`/${link}`}>
          <Button>Go to form</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlockHeading;
