import styles from './Content.module.css';
import Item from '../Item/Item';
import ContentProps from './Content.props';

const Content = ({ items }: ContentProps) => {
  return (
    <div className={styles['wrapper']}>
      {items.map((item) => (
        <Item
          key={item.created}
          name={item.name}
          gender={item.gender}
          height={item.height}
          mass={item.mass}
          birthYear={item.birth_year}
        />
      ))}
    </div>
  );
};

export default Content;
