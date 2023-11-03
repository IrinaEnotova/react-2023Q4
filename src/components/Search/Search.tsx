import { FormEvent, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import styles from './Search.module.css';

const Search = ({ searchQuery, handleChange, getSearch }: SearchProps) => {
  const [isErrorBoundary, setIsErrorBoundary] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div
      ref={wrapperRef}
      className={styles['wrapper']}
      onClick={(event) => {
        if (searchParams.has('character') && event.target === wrapperRef.current) {
          setSearchParams({});
        }
      }}
    >
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
