import { FC, useEffect, useRef } from 'react';
import UncontrolledResult from '../../components/UncontrolledResult/UncontrolledResult';
import styles from './MainPage.module.css';
import HookFormResult from '../../components/HookFormResult/HookFormResult';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setClearData } from '../../store/reducers/userSlice';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.userReducer);
  const resetData = (): void => {
    dispatch(setClearData());
  };
  const lastCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      lastCardRef.current?.classList.remove('last-card');
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <UncontrolledResult />
        <HookFormResult />
      </div>
      <div className={styles['result-wrapper']}>
        <Button className={styles.clear} onClick={resetData}>
          Clear data below
        </Button>
        {cards.length > 0 ? (
          <div className={styles['card-wrapper']}>
            {cards.map((card, idx) => {
              if (idx === 0) {
                return (
                  <div className="last-card" key={card.email} ref={lastCardRef}>
                    <Card cardData={card} />
                  </div>
                );
              } else {
                return <Card key={card.email} cardData={card} />;
              }
            })}
          </div>
        ) : (
          <h3>The state is empty</h3>
        )}
      </div>
    </>
  );
};

export default MainPage;
