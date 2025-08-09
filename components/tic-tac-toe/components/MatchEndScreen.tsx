import { setGameStatus } from "@/store/slices/gameSlice";
import { Trophy } from "lucide-react";
import React from "react";

const MatchEndScreen = ({ gameState, dispatch, startNewMatch }: any) => {
  const finalWinner =
    gameState.winner === "player1"
      ? gameState.players.player1
      : gameState.winner === "player2"
      ? gameState.players.player2
      : null;

  return (
    <div className="h-[calc(100vh-61px)] bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className=" bg-gradient-to-br from-purple-900 via-pink-800 to-red-900  rounded-2xl p-6 sm:p-8 w-full max-w-lg text-center shadow-xl">
        <div className="mb-8">
          {gameState.winner === "draw" ? (
            <>
              <div className="text-8xl sm:text-9xl mb-4">🤝</div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Legendary Draw!
              </h1>
              <p className="text-gray-600 text-xl">
                Two champions stand equal!
              </p>
            </>
          ) : (
            <>
              <div className="text-8xl sm:text-9xl mb-4">👑</div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Ultimate Champion!
              </h1>
              <p className="text-yellow-600 text-3xl font-bold mb-1 truncate">
                {finalWinner}
              </p>
              <p className="text-white text-lg">Reigns supreme!</p>
            </>
          )}
        </div>

        <div className="bg-gray-100 rounded-lg p-6 my-8 border border-gray-200">
          <h3 className="text-black font-bold text-xl mb-4">
            Final Battle Report
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white rounded-lg p-4 border border-gray-200">
              <span className="text-gray-800 font-medium text-lg truncate pr-3">
                {gameState.players.player1}
              </span>
              <div className="text-right flex-shrink-0">
                <div className="text-black font-bold text-xl">
                  {gameState.scores.player1} points
                </div>
                <div className="text-gray-500 text-sm">
                  {gameState.roundWins.player1} victories
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white rounded-lg p-4 border border-gray-200">
              <span className="text-gray-800 font-medium text-lg truncate pr-3">
                {gameState.players.player2}
              </span>
              <div className="text-right flex-shrink-0">
                <div className="text-black font-bold text-xl">
                  {gameState.scores.player2} points
                </div>
                <div className="text-gray-500 text-sm">
                  {gameState.roundWins.player2} victories
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={startNewMatch}
            className="w-full p-4 cursor-pointer bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors"
          >
            New Epic Battle
          </button>

          <button
            onClick={() => dispatch(setGameStatus("leaderboard"))}
            className="w-full p-4 cursor-pointer bg-white border border-gray-300 text-black font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Hall of Champions
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchEndScreen;