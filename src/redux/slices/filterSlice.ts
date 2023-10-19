import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


export type SortItem = {
  name:string,
  sortProperty: 'rating' | 'title' | 'price',
}



export interface FilterSliceState {
  searchValue?: string;
  categoryId: number;
  pageCount: number;
  sort: SortItem;
  order: string;
}

const initialValue: FilterSliceState = {
  searchValue: '',
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.order = action.payload;
    },


    setFilters(state, action: PayloadAction<FilterSliceState>) {
      
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryId, setSort, setOrder, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
