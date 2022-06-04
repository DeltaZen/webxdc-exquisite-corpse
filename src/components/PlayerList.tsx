import React from "react";

const PlayerList: React.FC<{ players: Player[]; children?: JSX.Element }> = ({
  players,
  children,
}) => {
  console.log(players);
  return (
    <>
      <ul className="flex flex-col items-center justify-center max-w-2xl px-4 py-2 m-2 btn-style">
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
