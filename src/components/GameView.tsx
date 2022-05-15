import React from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  return (
    <AppCtx.Consumer>
      {({ status, setStatus }) => (
        <>
          <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>
          {game.gameStatus === "playing" && (
            <p>
              ⌛ {game.currentRound}/{game.rounds}
            </p>
          )}
          {/* <PlayerList players={game.players}>
            <h3 className="font-bold">Players</h3>
          </PlayerList> */}

          <PlayerList players={status.currentViewedGame?.players as Player[]}>
            <h3 className="font-bold">Players (actual)</h3>
          </PlayerList>

          <PlayerList players={status.currentPlayingGame?.players as Player[]}>
            <h3 className="font-bold">Players (jugando)</h3>
          </PlayerList>

          {game.gameStatus === "new" && <GameViewNew game={game} />}
          {game.gameStatus === "playing" && (
            <>
              {status.currentViewedGame?.currentPlayer.address ===
              status.playerAddr ? (
                <GameViewText />
              ) : (
                <p>
                  It's {status.currentViewedGame?.currentPlayer.name}'s turn
                </p>
              )}
            </>
          )}
        </>
      )}
    </AppCtx.Consumer>
  );
};

export default GameView;
