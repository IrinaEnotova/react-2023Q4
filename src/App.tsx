import { Component, ReactNode } from 'react';
import Header from './components/Search/Search';
import Content from './components/Content/Content';
import { BASE_PATH, SEARCH_PATH } from './API/constants';
import { AppState } from './interfaces/interfaces';
import './App.css';
import Loader from './components/Loader/Loader';

class App extends Component {
  state: AppState = {
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
      <div className="wrapper">
        <Header searchQuery={this.state.searchQuery} handleChange={this.handleSearchQuery} getSearch={this.getSearch} />
        {this.state.isLoading ? <Loader /> : <Content items={this.state.items} />}
      </div>
    );
  }
}

export default App;
