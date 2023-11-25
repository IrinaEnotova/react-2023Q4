import { ItemsResponse } from '@/interfaces/interfaces';
import { ReactNode } from 'react';

export interface ItemsLayoutProps {
  data: ItemsResponse;
  children: ReactNode;
}
