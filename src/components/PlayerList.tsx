import React from "react";
import { SandClock } from "./icons";

const PlayerList: React.FC<{
  players: Player[];
  children?: JSX.Element;
  currentPlayer?: Player;
}> = ({ players, children, currentPlayer }) => {
  console.log(players);
  return (
    <>
      <ul className="flex flex-col items-center justify-center w-1/2 max-w-2xl px-4 py-2 m-2 btn-style">
        {children}
        {players ? (
          players.map((player: Player) => {
            return (
              <li key={player.address} className="relative px-6 clamp-1">
                {currentPlayer?.address === player.address ? (
                  <span className="absolute left-0 inline-flex w-8 h-8 py-1 -translate-y-1/2 top-1/2">
                    <SandClock />
                  </span>
                ) : null}
                {player.name}
              </li>
            );
          })
        ) : (
          <li>You shouldn't be able to see this error 🚶‍♂️</li>
        )}
      </ul>
    </>
  );
};

export default PlayerList;
