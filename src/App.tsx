import { Component, ReactNode } from 'react';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <CharactersPage />;
      </ErrorBoundary>
    );
  }
}

export default App;
