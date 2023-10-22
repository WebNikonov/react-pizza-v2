import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getItemsFromLs } from '../../utils/getItemsFromLS';
import { cartTotalPrice } from '../../utils/calcTotalPrice';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const {items, totalPrice} = getItemsFromLs()

const initialValue: CartSliceState = {
  items: items,
  totalPrice: totalPrice ,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialValue,
  reducers: {
    addItem(state , action: PayloadAction<TCartItem>) {
      let findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action: PayloadAction<String>) {
      let findItem = state.items.find((obj: any) => obj.id === action.payload);

      if (findItem && findItem.count > 0) {
        --findItem.count;
          state.totalPrice = cartTotalPrice(state.items);
      }

      if (findItem?.count === 0) {
        state.items = state.items.filter((obj: any) => obj.id !== action.payload);
        state.totalPrice = cartTotalPrice(state.items);
      }

      state.totalPrice = cartTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<String>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = cartTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj: any) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;



export default cartSlice.reducer;
