import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchByIdStatus', async (params, ThunkApi) => {
  const { url, category, search, sort, pageCount, orderType } = params;
  const { data } = await axios.get(
    `${url}page=${pageCount}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${orderType}${search}`,
  );

  return data;
});

const initialValue = {
  items: [],
  status: 'loading', // loading, success, error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialValue,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export const selectPizzaData = (state) => state.pizza;

export default pizzaSlice.reducer;
