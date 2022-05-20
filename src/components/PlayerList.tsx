import React from "react";

const PlayerList: React.FC<{ players: Player[]; children?: JSX.Element }> = ({
  players,
  children,
}) => {
  return (
    <>
      <ul className="flex flex-col items-center justify-center p-2 m-2 border border-black rounded-lg">
        {children}
        {players ? (
          players.map((player: Player) => {
            return <li key={player.name}>{player.name}</li>;
          })
        ) : (
          <li>You shouldn't be able to see this error 🚶‍♂️</li>
        )}
      </ul>
    </>
  );
};

export default PlayerList;
