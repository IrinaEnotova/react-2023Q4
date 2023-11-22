import { ReactNode } from 'react';

interface ApiItem {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
}

export interface ItemsResponse {
  docs: ApiItem[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: undefined | string;
}

export default ApiItem;
