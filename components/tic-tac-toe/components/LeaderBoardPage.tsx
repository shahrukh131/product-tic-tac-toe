import { resetGame, setGameStatus } from "@/store/slices/gameSlice";
import { Home, Play, Trophy } from "lucide-react";
import React from "react";

// Define a type for a leaderboard entry for better type safety
type LeaderboardEntry = [string, number];

const LeaderBoardPage = ({
  dispatch,
  clearLeaderboardHandler,
  leaderboardState,
}: any) => {
  const sortedPlayers: LeaderboardEntry[] = (
    Object.entries(leaderboardState.leaderboard || {}) as LeaderboardEntry[]
  ).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

  return (
    <div className="h-[calc(100vh-61px)] bg-white text-black p-4 flex justify-center items-center font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm">
          <div className="text-center mb-8 relative">
            <div className="absolute top-0 right-0">
              <button
                onClick={() => dispatch(setGameStatus("setup"))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Go to Home"
              >
                <Home className="w-6 h-6 text-gray-700 cursor-pointer" />
              </button>
            </div>

            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-black mb-2">Leaderboard</h1>
            <p className="text-gray-600 text-lg">Legends across all battles</p>
          </div>

          {sortedPlayers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">⚔️</div>
              <p className="text-gray-700 text-xl font-medium">
                No battles fought yet
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Start your first match to join the ranks!
              </p>
            </div>
          ) : (
            <div className="space-y-3 mb-8">
              {sortedPlayers.map(([name, score], index) => (
                <div
                  key={name}
                  className={`border rounded-lg p-2 flex items-center justify-between transition-colors ${
                    index === 0
                      ? "bg-yellow-50 border-yellow-300"
                      : index === 1
                      ? "bg-gray-100 border-gray-300"
                      : index === 2
                      ? "bg-orange-50 border-orange-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-center w-12">
                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      {index > 2 && (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-base text-gray-700">
                          #{index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-black font-semibold text-lg">
                        {name}
                      </span>
                      {index === 0 && (
                        <div className="text-yellow-600 text-sm font-medium">
                          👑 Reigning Champion
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-black font-bold text-xl">{score}</div>
                    <div className="text-gray-500 text-sm">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons at the bottom */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                dispatch(resetGame());
                dispatch(setGameStatus("setup"));
              }}
              className="w-full p-3 cursor-pointer bg-black text-white font-bold rounded-md hover:bg-gray-800
               flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start New Battle
            </button>

            {sortedPlayers.length > 0 && (
              <button
                onClick={clearLeaderboardHandler}
                className="w-full p-3 cursor-pointer bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Reset Leaderboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
