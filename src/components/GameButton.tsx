import React from "react";
import AppCtx from "../context/AppContext";

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);
  return (
    <li
      className="flex flex-col items-center justify-between px-2 m-2 border border-black rounded-lg cursor-pointer"
      onClick={() => {
        console.log("clicked gameBtn.tsx to set status.currentViewedGame");
        setStatus({ ...status, currentViewedGame: game });
      }}
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
