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
  isErrorBoundary: boolean;
}

const initialState: ItemsState = {
  searchQuery: '',
  items: [],
  page: 1,
  totalPages: 1,
  limit: 12,
  isDetailsOpen: false,
  detailedItem: null,
  isErrorBoundary: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    allItemsFetching(state, action: PayloadAction<{ payloadItems: ApiItem[]; payloadTotalPages: number }>) {
      state.items = action.payload.payloadItems;
      state.totalPages = action.payload.payloadTotalPages;
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
    isErrorBoundaryChanging(state, action: PayloadAction<boolean>) {
      state.isErrorBoundary = action.payload;
    },
  },
});

export default itemsSlice.reducer;
