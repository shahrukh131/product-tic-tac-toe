import { configureStore } from "@reduxjs/toolkit";
import categoryFilterReducer from "./slices/categoryFilterSlice";
import gameReducer from "./slices/gameSlice";
import leaderboardReducer from "./slices/leaderboardSlice";
export const store = configureStore({
  reducer: {
    categoryFilter: categoryFilterReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
