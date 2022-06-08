import React, { useEffect } from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";
import { SandClock } from "./icons";
import GameViewClosed from "./GameViewClosed";

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);

  const handleEndGame = (corpse?: Corpse) => {
    if (corpse) {
      const newCorpse = {
        ...corpse,
        gameStatus: "closed",
        date: new Date(),
      };

      const info = `"${corpse.sessionName}" finished, go see the result 👀`;
      window.webxdc.sendUpdate({ payload: newCorpse, info: info }, info);

      setStatus({
        ...status,
        currentViewedGame: newCorpse as Corpse,
        currentPlayingGame: newCorpse as Corpse,
      });
    }
  };

  return (
    <>
      <h2 className="p-2 m-2 overflow-hidden text-4xl font-bold text-center break-words max-w-2xl w-[80vw] comillas clamp">
        {game.sessionName}
      </h2>
      {game.gameStatus === "playing" && (
        <p className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center justify-center mr-3">
            <SandClock /> {game.currentRound}/{game.rounds}
          </span>{" "}
          <span className="flex flex-row items-center justify-center ml-3">
            Turn: {game.turnID}/{game.players.length * game.rounds}
          </span>
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
          <PlayerList players={status.currentViewedGame?.players as Player[]}>
            <h3 className="font-bold">Players</h3>
          </PlayerList>
          {status.currentViewedGame?.currentPlayer.address ===
          status.playerAddr ? (
            <>
              <GameViewText />
            </>
          ) : (
            <>
              <p className="clamp-1">
                It's {status.currentViewedGame?.currentPlayer.name}'s turn
              </p>
              {status.currentViewedGame?.admin.address ===
                status.playerAddr && (
                <button
                  className="btn-simple btn-style"
                  type="button"
                  onClick={() => handleEndGame(status.currentViewedGame)}
                >
                  End game
                </button>
              )}
            </>
          )}
        </>
      )}
      {game.gameStatus === "closed" && <GameViewClosed game={game} />}
    </>
  );
};

export default GameView;
