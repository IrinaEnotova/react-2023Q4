import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import uncontrolledReducer from './reducers/uncontrolledSlice';
import hookFormReducer from './reducers/hookFormSlice';

const rootReducer = combineReducers({ uncontrolledReducer, hookFormReducer });

export const setupStore = (): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
