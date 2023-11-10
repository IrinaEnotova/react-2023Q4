import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import './index.css';
import { AppContextProvider } from './context/AppContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppContextProvider
        value={{
          items: [],
          searchQuery: localStorage.getItem('query') || '',
          selectedItemId: '',
        }}
      >
        <App />
      </AppContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
