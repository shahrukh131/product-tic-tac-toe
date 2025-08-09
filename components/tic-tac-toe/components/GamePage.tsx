import { resetBoard, setGameStatus } from "@/store/slices/gameSlice";
import { Circle, Home, RotateCcw, X } from "lucide-react";
import React from "react";

const GamePage = ({ gameState, dispatch, handleCellClick }: any) => {
  return (
    <div className="h-[calc(100vh-61px)] bg-gray-50 text-black p-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Round {gameState.currentRound} of 5
            </h1>
            <button
              onClick={() => dispatch(setGameStatus("setup"))}
              className="p-2 border cursor-pointer border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Go to Home"
            >
              <Home className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-cyan-100 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm font-medium mb-2">
                  Current Player
                </p>
                <p className="text-black font-bold text-xl truncate">
                  {gameState.currentPlayer === "X"
                    ? gameState.players.player1
                    : gameState.players.player2}
                </p>
                <div className="inline-flex items-center justify-center w-8 h-8  mt-2">
                  <span className="text-black font-bold text-lg">
                    {gameState.currentPlayer === "X" ? (
                      <X className="w-12 h-12 sm:w-12 sm:h-12 text-blue-600" />
                    ) : (
                      <Circle className="w-10 h-10 sm:w-12 sm:h-10 text-red-600" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-lime-100 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm font-medium mb-2">
                  Round Wins
                </p>
                <div className="flex justify-around items-center gap-2 mt-3">
                  <div className="text-center">
                    <p className="text-black font-bold text-2xl">
                      {gameState.roundWins.player1}
                    </p>
                    <p className="text-gray-600 text-xs truncate max-w-[80px]">
                      {gameState.players.player1}
                    </p>
                  </div>
                  <div className="text-gray-400 font-bold text-lg">vs</div>
                  <div className="text-center">
                    <p className="text-black font-bold text-2xl">
                      {gameState.roundWins.player2}
                    </p>
                    <p className="text-gray-600 text-xs truncate max-w-[80px]">
                      {gameState.players.player2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rose-100 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm font-medium mb-2">
                  Total Score
                </p>
                <div className="flex justify-around items-center gap-2 mt-3">
                  <div className="text-center">
                    <p className="text-black font-bold text-2xl">
                      {gameState.scores.player1}
                    </p>
                    <p className="text-gray-600 text-xs truncate max-w-[80px]">
                      {gameState.players.player1}
                    </p>
                  </div>
                  <div className="text-gray-400 font-bold text-lg">vs</div>
                  <div className="text-center">
                    <p className="text-black font-bold text-2xl">
                      {gameState.scores.player2}
                    </p>
                    <p className="text-gray-600 text-xs truncate max-w-[80px]">
                      {gameState.players.player2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-8 shadow-sm">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto mb-8">
            {gameState.board.map((cell: any, index: number) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className="aspect-square cursor-pointer bg-gray-100 rounded-md flex items-center justify-center border-2 border-gray-300 hover:bg-gray-200 transition-colors disabled:cursor-not-allowed"
                disabled={cell || gameState.gameStatus !== "playing"}
              >
                {cell === "X" && (
                  <X className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
                )}
                {cell === "O" && (
                  <Circle className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" />
                )}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => dispatch(resetBoard())}
              className="px-6 py-3 cursor-pointer rounded-md bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
