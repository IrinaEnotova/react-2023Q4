import { FormEvent } from 'react';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import styles from './Search.module.css';

const Search = ({ searchQuery, handleChange, getSearch }: SearchProps) => {
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
