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

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);
  return (
    <div>
      <h2>{game.sessionName}</h2>
      {ctx?.playerName === game.admin.name ? (
        <p>You are admin here</p>
      ) : (
        <p>Not your game</p>
      )}
      <p>
        Admin: {game.admin.name} ({game.admin.address})
      </p>
    </div>
  );
};

export default GameView;
