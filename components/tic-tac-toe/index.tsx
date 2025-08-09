import React from "react";
import PlayerSetupPage from "./components/PlayerSetupPage";
import { useGameLogic } from "@/hooks/use-game";
import { resetGame, setGameStatus } from "@/store/slices/gameSlice";
import { clearLeaderboard } from "@/store/slices/leaderboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import GamePage from "./components/GamePage";
import RoundEndScreen from "./components/RoundEndScreen";
import MatchEndScreen from "./components/MatchEndScreen";
import LeaderBoardPage from "./components/LeaderBoardPage";

const TicTacToe = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const leaderboardState = useAppSelector((state) => state.leaderboard);
  const { handleCellClick } = useGameLogic();

  const startNewMatch = () => {
    dispatch(resetGame());
    dispatch(setGameStatus("setup"));
  };

  const clearLeaderboardHandler = () => {
    dispatch(clearLeaderboard());
  };
  return (
    <div>
      {gameState.gameStatus === "setup" && (
        <PlayerSetupPage gameState={gameState} dispatch={dispatch} />
      )}
      {gameState.gameStatus === "playing" && (
        <GamePage
          gameState={gameState}
          dispatch={dispatch}
          handleCellClick={handleCellClick}
        />
      )}
      {gameState.gameStatus === "roundEnd" && (
        <>
          <GamePage
            gameState={gameState}
            dispatch={dispatch}
            handleCellClick={handleCellClick}
          />
          <RoundEndScreen gameState={gameState} dispatch={dispatch} />
        </>
      )}
      {gameState.gameStatus === "matchEnd" && (
        <MatchEndScreen
          gameState={gameState}
          dispatch={dispatch}
          startNewMatch={startNewMatch}
        />
      )}
      {gameState.gameStatus === "leaderboard" && (
        <LeaderBoardPage
          dispatch={dispatch}
          clearLeaderboardHandler={clearLeaderboardHandler}
          leaderboardState={leaderboardState}
        />
      )}
    </div>
  );
};

export default TicTacToe;
