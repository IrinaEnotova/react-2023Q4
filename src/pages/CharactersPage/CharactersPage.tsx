import { Component, ReactNode } from 'react';
import Header from '../../components/Search/Search';
import ItemList from '../../components/ItemList/ItemList';
import { BASE_PATH, SEARCH_PATH } from '../../API/constants';
import { CharacterPageState } from '../../interfaces/interfaces';
import Loader from '../../components/Loader/Loader';
import ItemsNotFound from '../../components/ItemsNotFound/ItemsNotFound';
import styles from './CharacterPage.module.css';

class CharactersPage extends Component {
  state: CharacterPageState = {
    searchQuery: '',
    items: [],
    isLoading: false,
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

  render(): ReactNode {
    return (
      <div className={styles['wrapper']}>
        <Header searchQuery={this.state.searchQuery} handleChange={this.handleSearchQuery} getSearch={this.getSearch} />
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
