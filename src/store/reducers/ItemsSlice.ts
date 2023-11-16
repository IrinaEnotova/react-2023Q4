import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ApiItem from '../../interfaces/interfaces';

interface ItemsState {
  searchQuery: string;
  items: ApiItem[];
  page: number;
  totalPages: number;
  limit: number;
  isDetailsOpen: boolean;
  detailedItem: ApiItem | null;
}

const initialState: ItemsState = {
  searchQuery: localStorage.getItem('query') || '',
  items: [],
  page: 1,
  totalPages: 1,
  limit: 12,
  isDetailsOpen: false,
  detailedItem: null,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsChanging(state, action: PayloadAction<ApiItem[]>) {
      state.items = action.payload;
    },
    totalPagesChanging(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    pageChanging(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    limitChanging(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    searchQueryChanging(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    isDetailsOpenChanging(state, action: PayloadAction<boolean>) {
      state.isDetailsOpen = action.payload;
    },
    detailedItemChanging(state, action: PayloadAction<ApiItem | null>) {
      state.detailedItem = action.payload;
    },
  },
});

export default itemsSlice.reducer;
