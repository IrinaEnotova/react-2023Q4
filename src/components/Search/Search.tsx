import { FormEvent, useState } from 'react';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import styles from './Search.module.css';

const Search = ({ searchQuery, handleChange, getSearch }: SearchProps) => {
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    getSearch();
  };

  const throwErrorBoundary = () => {
    setIsErrorBoundary(true);
  };

  if (isErrorBoundary) {
    throw new Error('ErrorBoundary worked!');
  }

  return (
    <div className={styles['wrapper']}>
      <form className={styles['form']} onSubmit={submit}>
        <input
          className={styles['input']}
          type="text"
          value={searchQuery}
          placeholder="Search by name"
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        />
        <Button className={styles['search-btn']}>Search</Button>
      </form>
      <Button className={styles['error-btn']} onClick={throwErrorBoundary}>
        Throw error
      </Button>
    </div>
  );
};

export default Search;
