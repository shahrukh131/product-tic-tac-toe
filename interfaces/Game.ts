export interface GameState {
  players: { player1: string; player2: string };
  currentPlayer: "X" | "O";
  board: (string | null)[];
  scores: { player1: number; player2: number };
  roundWins: { player1: number; player2: number };
  currentRound: number;
  gameStatus: "setup" | "playing" | "roundEnd" | "matchEnd" | "leaderboard";
  winner: "player1" | "player2" | "draw" | "X" | "O" | null;
  matchWinner: "player1" | "player2" | null;
}