import styles from './ItemsNotFound.module.css';

const ItemsNotFound = () => {
  return (
    <div className={styles['wrapper']}>
      <img src="/item-icon.svg" alt="Items not found" />
      <h2 className={styles['not-found']}>
        Characters were not found! <br /> Enter another name
      </h2>
    </div>
  );
};

export default ItemsNotFound;
