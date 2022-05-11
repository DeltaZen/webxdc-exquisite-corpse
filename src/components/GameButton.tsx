import React from "react";
import AppCtx from "../context/AppContext";

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

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);
  return (
    <li
      className="flex flex-row items-center justify-between w-full m-2"
      onClick={() => ctx?.toggleCurrentGame(game)}
    >
      <span>{game.gameStatus}</span>
      <span>{game.sessionName}</span>
      <span>{game.admin.name}</span>
      <span>
        {game.currentRound}/{game.rounds}
      </span>
    </li>
  );
};

export default Game;
