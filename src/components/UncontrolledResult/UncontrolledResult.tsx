import { FC } from 'react';
import Button from '../Button/Button';
import styles from './UncontrolledResult.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHook';
import { setUncontrolledState } from '../../store/reducers/uncontrolledSlice';

const UncontrolledResult: FC = () => {
  const dispatch = useAppDispatch();
  const { ...currentState } = useAppSelector((state) => state.uncontrolledReducer);
  const resetData = (): void => {
    dispatch(
      setUncontrolledState({
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
      <h2>Uncontrolled components</h2>
      <div className={styles.btns}>
        <Link to="/uncontrolled">
          <Button>Go to form</Button>
        </Link>
        <Button onClick={resetData}>Clear data below</Button>
      </div>
      {currentState.name ? (
        <div className={styles['card']}>
          <img className={styles['img']} width={50} height={50} src={currentState.image} alt={currentState.name} />
          <ul className={styles['list']}>
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
        </div>
      ) : (
        <h3>The state is empty</h3>
      )}
    </div>
  );
};

export default UncontrolledResult;
