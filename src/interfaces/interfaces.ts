import { ReactNode } from 'react';

interface ApiItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface CharacterPageState {
  searchQuery: string;
  items: ApiItem[];
  isLoading: boolean;
  isErrorBoundary: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: undefined | string;
}

export default ApiItem;
