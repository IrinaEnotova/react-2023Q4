import styles from './Header.module.css';
import HeaderProps from './Header.props';

const Header = ({ searchQuery, handleChange, getSearch }: HeaderProps) => {
  return (
    <div className={styles['wrapper']}>
      <input
        className={styles['input']}
        type="text"
        value={searchQuery}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
      <button onClick={getSearch} className={styles['button']}>
        Search
      </button>
    </div>
  );
};

export default Header;
