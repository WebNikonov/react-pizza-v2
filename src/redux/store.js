import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slices/filterSlice.js';
import cart from '../redux/slices/cartSlice.js';

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});

console.log(store);
