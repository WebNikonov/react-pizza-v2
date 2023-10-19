import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';



export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});


export type AppDispatch = typeof store.dispatch
export const useAppDispatch =  () => useDispatch<AppDispatch>()
export type  RootState = ReturnType<typeof store.getState>