import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";

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
interface IndexProps {
  playerName: string;
  playerAddr: string;
  currentViewedGame?: Corpse;
  currentPlayingGame?: Corpse;
  view: "new" | "list";
  games: Corpse[];
}
interface StatusGroupI {
  status: IndexProps;
  gameStatus: "new" | "playing" | "closed";
  title: string;
}
const StatusGroup: React.FC<StatusGroupI> = ({ status, gameStatus, title }) => {
  return status.games.filter((game) => game.gameStatus === gameStatus).length >
    0 ? (
    <>
      <h3>{title}</h3>
      <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
        {status.games
          .filter((game) => game.gameStatus === gameStatus)
          .map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })}
      </ul>
      ;
    </>
  ) : null;
};

const GameList = () => {
  //const ctx = React.useContext(AppCtx);
  return (
    <AppCtx.Consumer>
      {({ status, setStatus }) =>
        status.currentViewedGame ? (
          <>
            <GameView game={status.currentViewedGame} />
            <button
              onClick={() =>
                setStatus({ ...status, currentViewedGame: undefined })
              }
              className="px-4 mb-2 border border-primario rounded-xl"
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <h2>List of games</h2>
            <StatusGroup status={status} gameStatus="new" title="Available" />
            <StatusGroup
              status={status}
              gameStatus="playing"
              title="In progress"
            />
            <StatusGroup status={status} gameStatus="closed" title="Closed" />
            {/* {status.games.filter((game) => game.gameStatus === "new").length >
              0 && <h3>Available</h3>}
            <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
              {status.games
                .filter((game) => game.gameStatus === "new")
                .map((game) => {
                  return <GameButton key={game.sessionName} game={game} />;
                })}
            </ul>
            {status.games.filter((game) => game.gameStatus === "playing")
              .length > 0 && <h3>In progress</h3>}
            <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
              {status.games
                .filter((game) => game.gameStatus === "playing")
                .map((game) => {
                  return <GameButton key={game.sessionName} game={game} />;
                })}
            </ul>
            {status.games.filter((game) => game.gameStatus === "closed")
              .length > 0 && <h3>Closed</h3>}
            <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
              {status.games
                .filter((game) => game.gameStatus === "closed")
                .map((game) => {
                  return <GameButton key={game.sessionName} game={game} />;
                })}
            </ul> */}
          </>
        )
      }
    </AppCtx.Consumer>
  );
};

export default GameList;
