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
  spoiler: string;
}

interface Player {
  name: string;
  address: string;
}

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);
  return (
    <li
      className="flex flex-col items-center justify-between px-2 m-2 border border-black rounded-lg cursor-pointer"
      onClick={() => ctx?.toggleCurrentGame(game)}
    >
      <span className="font-bold">{game.sessionName}</span>
      <span>👑{game.admin.name}</span>
      {game.players.length > 0 && <span>🚶‍♂️{game.players.length}</span>}
      {game.gameStatus === "playing" && (
        <span>
          ⌛{game.currentRound}/{game.rounds}
        </span>
      )}
    </li>
  );
};

export default Game;
