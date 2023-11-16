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
  isAllItemsLoading: boolean;
  isSingleItemLoading: boolean;
}

const initialState: ItemsState = {
  searchQuery: localStorage.getItem('query') || '',
  items: [],
  page: 1,
  totalPages: 1,
  limit: 12,
  isDetailsOpen: false,
  detailedItem: null,
  isAllItemsLoading: false,
  isSingleItemLoading: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    allItemsFetching(
      state,
      action: PayloadAction<{ payloadItems: ApiItem[]; payloadTotalPages: number; payloadIsAllItemsLoading: boolean }>
    ) {
      state.items = action.payload.payloadItems;
      state.totalPages = action.payload.payloadTotalPages;
      state.isAllItemsLoading = action.payload.payloadIsAllItemsLoading;
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
    isAllItemsLoadingChanging(state, action: PayloadAction<boolean>) {
      state.isAllItemsLoading = action.payload;
    },
    isSingleItemLoadingChanging(state, action: PayloadAction<boolean>) {
      state.isSingleItemLoading = action.payload;
    },
  },
});

export default itemsSlice.reducer;
