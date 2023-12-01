import { FC } from 'react';
import Button from '../Button/Button';
import styles from './HookFormResult.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setHookFormState } from '../../store/reducers/hookFormSlice';

const HookFormResult: FC = () => {
  const dispatch = useAppDispatch();
  const { ...currentState } = useAppSelector((state) => state.hookFormReducer);
  const resetData = (): void => {
    dispatch(
      setHookFormState({
        name: '',
        age: 0,
        email: '',
        password: '',
        gender: '',
        isAcceptTerms: false,
        image: '',
        country: '',
      })
    );
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
      {currentState.name ? (
        <ul className={styles['list']}>
          <img width={50} height={50} src={currentState.image} alt={currentState.name} />
          <li>
            <span className={styles['list-item']}>Name: </span>
            {currentState.name}
          </li>
          <li>
            <span className={styles['list-item']}>Age: </span>
            {currentState.age}
          </li>
          <li>
            <span className={styles['list-item']}>Email: </span>
            {currentState.email}
          </li>
          <li>
            <span className={styles['list-item']}>Password: </span>
            {currentState.password}
          </li>
          <li>
            <span className={styles['list-item']}>Gender: </span>
            {currentState.gender}
          </li>
          <li>
            <span className={styles['list-item']}>Accept T&C: </span>
            {currentState.isAcceptTerms ? 'Yes' : 'No'}
          </li>
          <li>
            <span className={styles['list-item']}>Country: </span>
            {currentState.country}
          </li>
        </ul>
      ) : (
        <h3>The state is empty</h3>
      )}
    </div>
  );
};

export default HookFormResult;
