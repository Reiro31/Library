import { combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import libraryReducer from './books';

const rootReducer = combineReducers({
  library: libraryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
