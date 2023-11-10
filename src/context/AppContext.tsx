import { createContext, useState, Dispatch, SetStateAction, ReactNode, JSX } from 'react';
import ApiItem from '../interfaces/interfaces';

export interface CurrentState {
  items: ApiItem[];
  searchQuery: string;
  selectedItemId: string;
}

export interface AppContextInterface {
  currentState: CurrentState;
  setCurrentState: Dispatch<SetStateAction<CurrentState>>;
}

const defaultState = {
  currentState: {
    items: [],
    searchQuery: localStorage.getItem('query') || '',
    selectedItemId: '',
  },
  setCurrentState: (currentState: CurrentState) => {
    return currentState;
  },
} as AppContextInterface;

export const AppContext = createContext(defaultState);

export interface AppProviderProps {
  children: ReactNode;
  value: CurrentState;
}

export const AppContextProvider = ({ children, value }: AppProviderProps): JSX.Element => {
  const [currentState, setCurrentState] = useState<CurrentState>(value);

  return <AppContext.Provider value={{ currentState, setCurrentState }}>{children}</AppContext.Provider>;
};
