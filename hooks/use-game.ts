// useGameLogic.js
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { makeMove, endRound, endMatch } from "../store/slices/gameSlice";
import { updateLeaderboard as updateGlobalLeaderboard } from "../store/slices/leaderboardSlice";

export const useGameLogic = () => {
  const dispatch = useDispatch();
  const gameState = useAppSelector((state) => state.game);

  const checkWinner = (
    board: ("X" | "O" | null)[]
  ): "X" | "O" | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : "draw";
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.gameStatus !== "playing") return;

    dispatch(makeMove({ index }));

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    const winner = checkWinner(newBoard as ("X" | "O" | null)[]);

    if (winner) {
      handleRoundEnd(winner);
    }
  };

  const handleRoundEnd = (winner: "X" | "O" | "draw" | null) => {
    dispatch(endRound({ winner }));
    const isMatchOver =
      gameState.currentRound >= 5 ||
      gameState.roundWins.player1 >= 3 ||
      gameState.roundWins.player2 >= 3;

    if (isMatchOver) {
      dispatch(
        updateGlobalLeaderboard({
          player1: gameState.players.player1,
          player2: gameState.players.player2,
          scores: gameState.scores,
        })
      );
      dispatch(endMatch());
    }
  };

  return {
    handleCellClick,
    handleRoundEnd,
    checkWinner,
  };
};
