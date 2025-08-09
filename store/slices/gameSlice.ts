import { GameState } from "@/interfaces/Game";
import { createSlice } from "@reduxjs/toolkit";



const initialState: GameState = {
  players: { player1: "", player2: "" },
  currentPlayer: "X",
  board: Array(9).fill(null),
  scores: { player1: 0, player2: 0 },
  roundWins: { player1: 0, player2: 0 },
  currentRound: 1,
  gameStatus: "setup", 
  winner: null,
  matchWinner: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    makeMove: (state, action) => {
      const { index } = action.payload;
      if (state.board[index] || state.gameStatus !== "playing") return;

      state.board[index] = state.currentPlayer;
      state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = "X";
    },
    startNewRound: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = state.currentRound % 2 === 1 ? "X" : "O";
      state.currentRound += 1;
      state.gameStatus = "playing";
      state.winner = null;
    },
    endRound: (state, action) => {
      const { winner } = action.payload;

      if (winner === "X") {
        state.scores.player1 += 2;
        state.scores.player2 += 1;
        state.roundWins.player1 += 1;
      } else if (winner === "O") {
        state.scores.player2 += 2;
        state.scores.player1 += 1; 
        state.roundWins.player2 += 1;
      }

      state.winner = winner;
      if (state.roundWins.player1 >= 3 || state.roundWins.player2 >= 3) {
        state.matchWinner =
          state.roundWins.player1 > state.roundWins.player2
            ? "player1"
            : "player2";
        state.gameStatus = "matchEnd";
      } else {
        state.gameStatus = "roundEnd";
      }
    },
    endMatch: (state) => {
      state.gameStatus = "matchEnd";
      state.winner =
        state.roundWins.player1 > state.roundWins.player2
          ? "player1"
          : state.roundWins.player2 > state.roundWins.player1
          ? "player2"
          : "draw";
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    resetGame: (state) => {
      return {
        ...initialState,
        players: state.players, 
        scores: { player1: 0, player2: 0 },
      };
    },
    resetMatch: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = "X";
      state.roundWins = { player1: 0, player2: 0 };
      state.currentRound = 1;
      state.winner = null;
      state.matchWinner = null;
      state.gameStatus = "playing";
    },
  },
});

export const {
  setPlayers,
  makeMove,
  resetBoard,
  startNewRound,
  endRound,
  endMatch,
  setGameStatus,
  resetGame,
  resetMatch,
} = gameSlice.actions;

export default gameSlice.reducer;
