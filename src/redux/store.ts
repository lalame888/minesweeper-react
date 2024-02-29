import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';


export const rootReducer = combineReducers({
  game: gameReducer
});
export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;