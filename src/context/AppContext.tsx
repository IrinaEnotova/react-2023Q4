import { createContext, useState, Dispatch, SetStateAction, ReactNode, JSX } from 'react';
import ApiItem from '../interfaces/interfaces';

export interface CurrentState {
  items: ApiItem[];
  searchQuery: string;
}

export interface AppContextInterface {
  currentState: CurrentState;
  setCurrentState: Dispatch<SetStateAction<CurrentState>>;
}

const defaultState = {
  currentState: {
    items: [],
    searchQuery: '',
  },
  setCurrentState: (currentState: CurrentState) => {
    return currentState;
  },
} as AppContextInterface;

export const AppContext = createContext(defaultState);

export interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [currentState, setCurrentState] = useState<CurrentState>({ items: [], searchQuery: '' });

  return <AppContext.Provider value={{ currentState, setCurrentState }}>{children}</AppContext.Provider>;
};
