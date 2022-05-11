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
  console.log(ctx?.currentGame);
  return (
    <>
      {ctx && ctx.currentGame ? (
        <>
          <GameView game={ctx.currentGame} />
          <button
            onClick={() => ctx?.toggleCurrentGame(undefined)}
            className="px-4 my-2 border border-primario rounded-xl"
          >
            Go back
          </button>
        </>
      ) : (
        <>
          <h2>List of games</h2>
          <ul className="container w-full">
            <li className="flex flex-row items-center justify-between w-full font-bold">
              <span>Status</span>
              <span>Name</span>
              <span>Admin</span>
              <span>Round</span>
            </li>
            {games.map((game) => {
              return <GameButton key={game.sessionName} game={game} />;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default GameList;
