import React from "react";
import AppCtx from "../context/AppContext";

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);
  return (
    <li
      className="relative flex flex-col items-center justify-between px-2 m-2 border border-black cursor-pointer btn-style"
      onClick={() => {
        setStatus({ ...status, currentViewedGame: game });
      }}
    >
      <span className="p-2 font-bold text-center break-words max-w-[90vw] comillas clamp">
        {game.sessionName.length > 63
          ? game.sessionName.slice(0, 60) + "..."
          : game.sessionName}
      </span>
      <span>👑{game.admin.name}</span>
      {game.players.length > 0 && <span>✍️{game.players.length}</span>}
      {game.gameStatus === "playing" && (
        <span>
          ⌛{game.currentRound}/{game.rounds}
        </span>
      )}
    </li>
  );
};

export default Game;
