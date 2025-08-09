import { createSlice } from '@reduxjs/toolkit';

const loadLeaderboard = () => {
  try {
    const saved = localStorage.getItem('ticTacToeLeaderboard');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn('localStorage not available:', error);
    return {};
  }
};

const initialState = {
  leaderboard: loadLeaderboard()
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateLeaderboard: (state, action) => {
      const { player1, player2, scores } = action.payload;
      
      if (player1) {
        state.leaderboard[player1] = (state.leaderboard[player1] || 0) + scores.player1;
      }
      if (player2) {
        state.leaderboard[player2] = (state.leaderboard[player2] || 0) + scores.player2;
      }
      
      try {
        localStorage.setItem('ticTacToeLeaderboard', JSON.stringify(state.leaderboard));
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }
    },
    clearLeaderboard: (state) => {
      state.leaderboard = {};
      try {
        localStorage.removeItem('ticTacToeLeaderboard');
      } catch (error) {
        console.warn('Could not clear localStorage:', error);
      }
    }
  }
});

export const { updateLeaderboard, clearLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;