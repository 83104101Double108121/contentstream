import { configureStore } from '@reduxjs/toolkit';
import contentFilterReducer from './contentFilterSlice';

export const store = configureStore({
  reducer: {
    contentFilter: contentFilterReducer,
  },
});