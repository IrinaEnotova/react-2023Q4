import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import itemsReducer from './reducers/ItemsSlice';
import { itemsAPI } from '../API/itemsService';

const rootReducer = combineReducers({ itemsReducer, [itemsAPI.reducerPath]: itemsAPI.reducer });

export const setupStore = (preloadedState?: PreloadedState<RootState>): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
