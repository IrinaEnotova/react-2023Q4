import { Component, ReactNode } from 'react';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import { BASE_PATH, SEARCH_PATH } from './API/constants';
import { AppState } from './interfaces/interfaces';
import './App.css';

class App extends Component {
  state: AppState = {
    searchQuery: '',
    items: [],
  };

  async componentDidMount(): Promise<void> {
    const { searchQuery } = this.state;
    this.fetchData(searchQuery);
  }

  fetchData = async (searchQuery: string) => {
    const res = await fetch(`${BASE_PATH}?${SEARCH_PATH}=${searchQuery}`);
    const data = await res.json();
    this.setState({ items: data.results });
  };

  handleSearchQuery = (query: string) => {
    this.setState({ searchQuery: query });
  };

  getSearch = () => {
    const { searchQuery } = this.state;
    this.fetchData(searchQuery);
  };

  render(): ReactNode {
    return (
      <div className="wrapper">
        <Header searchQuery={this.state.searchQuery} handleChange={this.handleSearchQuery} getSearch={this.getSearch} />
        <Content items={this.state.items} />
      </div>
    );
  }
}

export default App;
