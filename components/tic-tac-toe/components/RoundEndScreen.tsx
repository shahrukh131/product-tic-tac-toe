import { startNewRound } from "@/store/slices/gameSlice";
import React from "react";

const RoundEndScreen = ({ gameState, dispatch }: any) => {
  const winnerName =
    gameState.winner === "X"
      ? gameState.players.player1
      : gameState.winner === "O"
      ? gameState.players.player2
      : null;
  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
        <div className="mb-6">
          {gameState.winner === "draw" ? (
            <>
              <div className="text-7xl sm:text-8xl mb-4">🤝</div>
              <h2 className="text-3xl font-bold text-black mb-2">Epic Draw!</h2>
              <p className="text-gray-600 text-lg">Honor to both warriors.</p>
            </>
          ) : (
            <>
              <div className="text-7xl sm:text-8xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-black mb-2">
                Round Victor!
              </h2>
              <p className="text-green-600 text-2xl font-bold mb-3 truncate">
                {winnerName}
              </p>
              <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5">
                <span className="text-green-700 text-base font-medium">
                  +2 Battle Points
                </span>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 my-6 border border-gray-200">
          <p className="text-black font-semibold mb-4 text-lg">War Standings</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white rounded-md p-3 border border-gray-200">
              <span className="text-gray-800 font-medium truncate pr-2">
                {gameState.players.player1}
              </span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-black font-bold">
                  {gameState.scores.player1} pts
                </span>
                <span className="text-gray-500 text-sm">
                  ({gameState.roundWins.player1} wins)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white rounded-md p-3 border border-gray-200">
              <span className="text-gray-800 font-medium truncate pr-2">
                {gameState.players.player2}
              </span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-black font-bold">
                  {gameState.scores.player2} pts
                </span>
                <span className="text-gray-500 text-sm">
                  ({gameState.roundWins.player2} wins)
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => dispatch(startNewRound())}
          className="w-full p-4 cursor-pointer bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors"
        >
          Next Battle Round
        </button>
      </div>
    </div>
  );
};

export default RoundEndScreen;
