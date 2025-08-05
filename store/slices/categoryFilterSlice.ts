import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryFilterState {
  selectedCategories: number[];
}

const initialState: CategoryFilterState = {
  selectedCategories: [],
};

const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<number>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategories = state.selectedCategories.filter(
        (id) => id !== action.payload
      );
    },
    toggleCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      const index = state.selectedCategories.indexOf(categoryId);
      
      if (index >= 0) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(categoryId);
      }
    },
    setSelectedCategories: (state, action: PayloadAction<number[]>) => {
      state.selectedCategories = action.payload;
    },
    clearSelectedCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const {
  addCategory,
  removeCategory,
  toggleCategory,
  setSelectedCategories,
  clearSelectedCategories,
} = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;