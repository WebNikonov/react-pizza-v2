import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import {TCartItem} from './cartSlice';

type Sort = { 
  name:string,
  sortProperty: 'rating' | 'title' | 'price',
}

type FetchPizzasArgs = {
  url: string;
  category: string;
  search: string;
  sort: Sort;
  pageCount: number;
  orderType: string;
}

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  }


  export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaScliceState {
  items: PizzaItem[];
  status: Status;
}

const initialValue: PizzaScliceState = {
  items: [],
  status: Status.LOADING, // loading, success, error
};

export type SearchPizzaParams = {
  sort: Sort;
  search: string;
  category: string;
  pageCount: string;
  orderType: string;
  };



export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs> ('pizza/fetchByIdStatus', async (params) => {
  const { category, search, sort, pageCount, orderType } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://64c64bf80a25021fde917f89.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${orderType}${search}`,
  );

  return data ;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialValue,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
