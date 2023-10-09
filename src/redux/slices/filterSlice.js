import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  categoryId: 0,

  pageCount: 1,

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
      state.order = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setOrder, setPageCount } = filterSlice.actions;

export default filterSlice.reducer;
