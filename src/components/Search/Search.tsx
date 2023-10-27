import { Component, ReactNode } from 'react';
import { FormEvent } from 'react';
import SearchProps from './Search.props';
import Button from '../Button/Button';
import styles from './Search.module.css';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  submit = (event: FormEvent) => {
    event.preventDefault();
    this.props.getSearch();
  };

  render(): ReactNode {
    return (
      <form className={styles['wrapper']} onSubmit={this.submit}>
        <input
          className={styles['input']}
          type="text"
          value={this.props.searchQuery}
          onChange={(event) => {
            this.props.handleChange(event.target.value);
          }}
        />
        <Button>Search</Button>
      </form>
    );
  }
}

export default Search;
