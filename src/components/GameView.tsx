import React, { useEffect } from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";
import { SandClock } from "./icons";
import GameViewClosed from "./GameViewClosed";

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status } = React.useContext(AppCtx);

  return (
    <>
      <h2 className="p-2 m-2 overflow-hidden text-4xl font-bold text-center break-words max-w-2xl w-[80vw] comillas clamp">
        {game.sessionName}
      </h2>
      {game.gameStatus === "playing" && (
        <p className="flex flex-row items-center justify-center">
          <SandClock /> {game.currentRound}/{game.rounds} Turn: {game.turnID}/
          {game.players.length * game.rounds}
        </p>
      )}

      {game.gameStatus === "new" && (
        <>
          <PlayerList players={status.currentViewedGame?.players as Player[]}>
            <h3 className="font-bold">Players</h3>
          </PlayerList>

          <GameViewNew game={game} />
        </>
      )}
      {game.gameStatus === "playing" && (
        <>
          {status.currentViewedGame?.currentPlayer.address ===
          status.playerAddr ? (
            <>
              <PlayerList
                players={
                  status.currentViewedGame.sessionName ===
                  status.currentPlayingGame?.sessionName
                    ? (status.currentPlayingGame?.players as Player[])
                    : (status.currentViewedGame.players as Player[])
                }
              >
                <h3 className="font-bold">Players</h3>
              </PlayerList>

              <GameViewText />
            </>
          ) : (
            <>
              <p className="clamp-1">
                It's {status.currentViewedGame?.currentPlayer.name}'s turn
              </p>
            </>
          )}
        </>
      )}
      {game.gameStatus === "closed" && <GameViewClosed game={game} />}
    </>
  );
};

export default GameView;
