import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  categoryId: 0,

  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },

  order: 'asc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialValue,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrder(state, action) {
      console.log(state);
      console.log(action);
      state.order = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setOrder } = filterSlice.actions;

export default filterSlice.reducer;
