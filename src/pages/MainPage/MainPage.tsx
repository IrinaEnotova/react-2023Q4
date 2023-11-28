import { FC } from 'react';
import FirstResult from '../../components/FirstResult/FirstResult';
import styles from './MainPage.module.css';

const MainPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <FirstResult />
      <FirstResult />
    </div>
  );
};

export default MainPage;
