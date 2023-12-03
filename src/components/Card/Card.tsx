import { FC } from 'react';
import { CardProps } from './Card.props';
import styles from './Card.module.css';

const Card: FC<CardProps> = ({ cardData }) => {
  return (
    <div className={styles['card']}>
      <img className={styles['img']} width={50} height={50} src={cardData.image} alt={cardData.name} />
      <ul className={styles['list']}>
        <li>
          <span className={styles['list-item']}>Name: </span>
          {cardData.name}
        </li>
        <li>
          <span className={styles['list-item']}>Age: </span>
          {cardData.age}
        </li>
        <li>
          <span className={styles['list-item']}>Email: </span>
          {cardData.email}
        </li>
        <li>
          <span className={styles['list-item']}>Password: </span>
          {cardData.password}
        </li>
        <li>
          <span className={styles['list-item']}>Gender: </span>
          {cardData.gender}
        </li>
        <li>
          <span className={styles['list-item']}>Accept T&C: </span>
          {cardData.isAcceptTerms ? 'Yes' : 'No'}
        </li>
        <li>
          <span className={styles['list-item']}>Country: </span>
          {cardData.country}
        </li>
      </ul>
    </div>
  );
};

export default Card;
