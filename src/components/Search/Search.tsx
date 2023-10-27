import { FormEvent } from 'react';
import HeaderProps from './Search.props';
import styles from './Search.module.css';
import Button from '../Button/Button';

const Search = ({ searchQuery, handleChange, getSearch }: HeaderProps) => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    getSearch();
  };

  return (
    <form className={styles['wrapper']} onSubmit={submit}>
      <input
        className={styles['input']}
        type="text"
        value={searchQuery}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
      <Button>Search</Button>
    </form>
  );
};

export default Search;
