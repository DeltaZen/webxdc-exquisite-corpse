import React from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";

interface Corpse {
  sessionName: string;
  admin: Player;
  gameStatus: "new" | "playing" | "closed";
  players: Player[];
  currentPlayer: Player;
  rounds: number;
  currentRound: number;
  turnID: number;
  corpse: string[];
  spoiler: string;
}

interface Player {
  name: string;
  address: string;
}

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  //const ctx = React.useContext(AppCtx);

  // let isYourTurn = ctx.currentGame?.currentPlayer.address === ctx.playerAddr;
  let players = game.players;
  React.useEffect(() => {
    players = game.players;
  }, [game]);

  return (
    <AppCtx.Consumer>
      {({ status, setStatus }) => (
        <>
          <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>
          <PlayerList players={players}>
            <h3 className="font-bold">Players</h3>
          </PlayerList>

          <PlayerList players={status.currentGame?.players as Player[]}>
            <h3 className="font-bold">Players (ctx)</h3>
          </PlayerList>

          {game.gameStatus === "new" && <GameViewNew game={game} />}
          {game.gameStatus === "playing" && (
            <>
              {status.currentGame?.currentPlayer.address ===
              status.playerAddr ? (
                <GameViewText />
              ) : (
                <p>It's {status.currentGame?.currentPlayer.name}'s turn</p>
              )}
            </>
          )}
        </>
      )}
    </AppCtx.Consumer>
  );
};

export default GameView;
