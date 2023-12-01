import { FC } from 'react';
import UncontrolledResult from '../../components/UncontrolledResult/UncontrolledResult';
import styles from './MainPage.module.css';
import HookFormResult from '../../components/HookFormResult/HookFormResult';

const MainPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <UncontrolledResult />
      <HookFormResult />
    </div>
  );
};

export default MainPage;
