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
}

interface Player {
  name: string;
  address: string;
}

const GameList: React.FC<{ games: Corpse[] }> = ({ games }) => {
  const ctx = React.useContext(AppCtx);
  return (
    <>
      {ctx && ctx.currentGame ? (
        <>
          <GameView game={ctx.currentGame} />
          <button
            onClick={() => ctx?.toggleCurrentGame(undefined)}
            className="px-4 mb-2 border border-primario rounded-xl"
          >
            Go back
          </button>
        </>
      ) : (
        <>
          <h2>List of games</h2>
          {games.filter((game) => game.gameStatus === "new").length > 0 && (
            <h3>Available</h3>
          )}
          <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
            {games
              .filter((game) => game.gameStatus === "new")
              .map((game) => {
                return <GameButton key={game.sessionName} game={game} />;
              })}
          </ul>
          {games.filter((game) => game.gameStatus === "playing").length > 0 && (
            <h3>In progress</h3>
          )}
          <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
            {games
              .filter((game) => game.gameStatus === "playing")
              .map((game) => {
                return <GameButton key={game.sessionName} game={game} />;
              })}
          </ul>
          {games.filter((game) => game.gameStatus === "closed").length > 0 && (
            <h3>Closed</h3>
          )}
          <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
            {games
              .filter((game) => game.gameStatus === "closed")
              .map((game) => {
                return <GameButton key={game.sessionName} game={game} />;
              })}
          </ul>
        </>
      )}
    </>
  );
};

export default GameList;
