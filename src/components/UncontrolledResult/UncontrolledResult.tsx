import { FC } from 'react';
import Button from '../Button/Button';
import styles from './UncontrolledResult.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setClearUncontrolledData } from '../../store/reducers/uncontrolledSlice';
import Card from '../Card/Card';

const UncontrolledResult: FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.uncontrolledReducer);
  const resetData = (): void => {
    dispatch(setClearUncontrolledData());
  };

  return (
    <div className={styles.wrapper}>
      <h2>Uncontrolled components</h2>
      <div className={styles.btns}>
        <Link to="/uncontrolled">
          <Button>Go to form</Button>
        </Link>
        <Button onClick={resetData}>Clear data below</Button>
      </div>
      {cards.length > 0 ? (
        <div className="card-wrapper">
          {cards.map((card) => (
            <Card key={card.email} cardData={card} />
          ))}
        </div>
      ) : (
        <h3>The state is empty</h3>
      )}
    </div>
  );
};

export default UncontrolledResult;
