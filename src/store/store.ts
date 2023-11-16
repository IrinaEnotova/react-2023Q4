import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import itemsReducer from './reducers/ItemsSlice';
import { itemsAPI } from '../API/itemsService';

const rootReducer = combineReducers({ itemsReducer, [itemsAPI.reducerPath]: itemsAPI.reducer });

export const setupStore = (): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
