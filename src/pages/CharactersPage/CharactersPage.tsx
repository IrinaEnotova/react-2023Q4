import { Component, ReactNode } from 'react';
import Search from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import { BASE_PATH, SEARCH_PATH } from '../../API/constants';
import { CharacterPageState } from '../../interfaces/interfaces';
import Loader from '../../components/Loader/Loader';
import ItemsNotFound from '../../components/ItemsNotFound/ItemsNotFound';
import Button from '../../components/Button/Button';
import styles from './CharacterPage.module.css';

class CharactersPage extends Component {
  state: CharacterPageState = {
    searchQuery: '',
    items: [],
    isLoading: false,
    isErrorBoundary: false,
  };

  componentDidMount(): void {
    const searchQuery = localStorage.getItem('query') ? localStorage.getItem('query')! : '';
    if (searchQuery) {
      this.setState({ searchQuery: searchQuery });
    }
    this.fetchData(searchQuery);
  }

  fetchData = async (searchQuery: string) => {
    this.setState({ isLoading: true });
    const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=${searchQuery}`);
    const data = await res.json();
    this.setState({ items: data.results, isLoading: false });
  };

  handleSearchQuery = (query: string) => {
    this.setState({ searchQuery: query });
  };

  getSearch = () => {
    const { searchQuery } = this.state;
    localStorage.setItem('query', searchQuery);
    this.fetchData(searchQuery);
  };

  throwErrorBoundary = () => {
    this.setState({ isErrorBoundary: true });
  };

  render(): ReactNode {
    if (this.state.isErrorBoundary) {
      throw new Error('ErrorBoundary worked!');
    }
    return (
      <div className={styles['wrapper']}>
        <Search searchQuery={this.state.searchQuery} handleChange={this.handleSearchQuery} getSearch={this.getSearch} />
        <Button onClick={this.throwErrorBoundary}>Throw error</Button>
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.items.length > 0 ? (
          <ItemList items={this.state.items} />
        ) : (
          <ItemsNotFound />
        )}
      </div>
    );
  }
}

export default CharactersPage;
