import { Component, ReactNode } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <Content />
      </>
    );
  }
}

export default App;
