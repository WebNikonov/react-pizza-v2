import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slices/filterSlice.js';

export const store = configureStore({
  reducer: {
    filter,
  },
});

console.log(store);
