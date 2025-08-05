import { configureStore } from '@reduxjs/toolkit'
import categoryFilterReducer from './slices/categoryFilterSlice';

export const store = configureStore({
  reducer: {
   categoryFilter: categoryFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
