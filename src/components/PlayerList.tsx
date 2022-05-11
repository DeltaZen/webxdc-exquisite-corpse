import React from "react";

interface Player {
  name: string;
  address: string;
}

const PlayerList: React.FC<{ players: Player[]; children?: JSX.Element }> = ({
  players,
  children,
}) => {
  return (
    <>
      <ul className="flex flex-col items-center justify-center p-2 m-2 border border-black rounded-lg">
        {children}
        {players.map((player: Player) => {
          return <li key={player.name}>{player.name}</li>;
        })}
      </ul>
    </>
  );
};

export default PlayerList;
