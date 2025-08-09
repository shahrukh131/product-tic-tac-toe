import { setGameStatus, setPlayers } from "@/store/slices/gameSlice";
import { Play, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";

const PlayerSetupPage = ({ gameState, dispatch }: any) => {
  const [player1, setPlayer1] = React.useState(gameState.players.player1);
  const [player2, setPlayer2] = React.useState(gameState.players.player2);

  const handleStartMatch = () => {
    if (player1.trim() && player2.trim() && player1.trim() !== player2.trim()) {
      dispatch(
        setPlayers({
          player1: player1.trim(),
          player2: player2.trim(),
        })
      );
      dispatch(setGameStatus("playing"));
    }
  };

  const isFormValid =
    player1.trim() && player2.trim() && player1.trim() !== player2.trim();

  return (
    <div className="h-[calc(100vh-61px)] bg-white text-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <Image
            src="/images/tic-tac-toe.png"
            alt="Tic-Tac-Toe"
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-black mb-2">Tic-Tac-Toe</h1>
          <p className="text-gray-600 text-lg">Enter player names to start</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">
              Player 1 (X)
            </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Enter name for Player 1"
              maxLength={20}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">
              Player 2 (O)
            </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Enter name for Player 2"
              maxLength={20}
            />
          </div>

          <button
            onClick={handleStartMatch}
            disabled={!isFormValid}
            className="w-full p-3 cursor-pointer bg-black text-white font-bold rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => dispatch(setGameStatus("leaderboard"))}
            className="w-full p-3 cursor-pointer bg-gray-100 text-black border border-gray-300 rounded-md hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
          >
            <Trophy className="w-5 h-5 text-gray-600" />
            View Champions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetupPage;
