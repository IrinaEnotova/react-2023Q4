import { FC } from 'react';
import Button from '../Button/Button';
import styles from './HookFormResult.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setClearHookFormData } from '../../store/reducers/hookFormSlice';
import Card from '../Card/Card';

const HookFormResult: FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.hookFormReducer);
  const resetData = (): void => {
    dispatch(setClearHookFormData());
  };

  return (
    <div className={styles.wrapper}>
      <h2>React Hook Form</h2>
      <div className={styles.btns}>
        <Link to="/hook-form">
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

export default HookFormResult;
