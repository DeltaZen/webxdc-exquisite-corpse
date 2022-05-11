import React from "react";

interface Player {
  name: string;
  address: string;
}

const PlayerList: React.FC<{ players: Player[] }> = ({ players }) => {
  return (
    <ul>
      {players.map((player: Player) => {
        return <li key={player.name}>{player.name}</li>;
      })}
    </ul>
  );
};

export default PlayerList;
