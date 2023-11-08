import { FormEvent, useState, JSX, useContext } from 'react';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import { AppContext } from '../../context/AppContext';
import styles from './Search.module.css';

const Search = ({ getSearch }: SearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('query') || '');
  const { currentState, setCurrentState } = useContext(AppContext);
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    setCurrentState({ ...currentState, searchQuery: searchValue });
    getSearch(searchValue);
  };

  const throwErrorBoundary = (): void => {
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
          value={searchValue}
          placeholder="Search by name"
          onChange={(event): void => {
            setSearchValue(event.target.value);
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
