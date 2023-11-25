import { FormEvent, JSX, useEffect, useRef } from 'react';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { itemsSlice } from '../../store/reducers/ItemsSlice';
import styles from './Search.module.css';
import { useRouter } from 'next/router';

const Search = ({ getSearch }: SearchProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isErrorBoundary } = useAppSelector((state) => state.itemsReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.search && typeof router.query.search === 'string') {
      inputRef.current!.value = router.query.search;
      dispatch(itemsSlice.actions.searchQueryChanging(router.query.search));
    }
  }, []);

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    dispatch(itemsSlice.actions.searchQueryChanging(inputRef.current!.value));
    getSearch(inputRef.current!.value);
  };

  const throwErrorBoundary = (): void => {
    dispatch(itemsSlice.actions.isErrorBoundaryChanging(true));
  };

  if (isErrorBoundary) {
    throw new Error('ErrorBoundary worked!');
  }

  return (
    <div className={styles['wrapper']}>
      <form className={styles['form']} onSubmit={handleSearchSubmit}>
        <input ref={inputRef} className={styles['input']} type="text" placeholder="Search by name" />
        <Button className={styles['search-btn']}>Search</Button>
      </form>
      <Button className={styles['error-btn']} onClick={throwErrorBoundary}>
        Throw error
      </Button>
    </div>
  );
};

export default Search;
