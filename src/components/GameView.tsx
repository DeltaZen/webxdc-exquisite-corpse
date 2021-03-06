import React, { useEffect } from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";
import { SandClock } from "./icons";
import GameViewClosed from "./GameViewClosed";

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);

  let id = status.id;
  useEffect(() => {
    id = status.id;
    console.log("New turn in GameView");
  }, [status.id]);

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
        id: status.id + 1,
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
          <span>{game.rounds === 1 ? "1 round" : `${game.rounds} rounds`}</span>
          <span>{game.words} words minimum</span>
          <span>{game.spoilerWords} preview words</span>
          <PlayerList players={status.currentViewedGame?.players as Player[]}>
            <h3 className="font-bold">Players</h3>
          </PlayerList>
          <GameViewNew game={game} />

          {status.currentViewedGame?.admin.address === status.playerAddr && (
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
      {game.gameStatus === "playing" && (
        <>
          <PlayerList
            players={status.currentViewedGame?.players as Player[]}
            currentPlayer={status.currentViewedGame?.currentPlayer}
          >
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
