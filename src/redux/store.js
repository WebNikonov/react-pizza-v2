import { configureStore } from '@reduxjs/toolkit';
import filter from '../redux/slices/filterSlice.js';
import cart from '../redux/slices/cartSlice.js';
import pizza from '../redux/slices/pizzaSlice.js';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

console.log(store);
