import React from "react";
import AppCtx from "../context/AppContext";
import { SandClock, Crown, Users, Marker } from "./icons";

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);

  return (
    <li
      className="relative flex flex-col items-start justify-between px-2 m-4 py-3 cursor-pointer btn-style min-w-[120px]"
      onClick={() => {
        setStatus({ ...status, id: status.id + 1, currentViewedGame: game });
      }}
    >
      <Marker />
      <span className="max-w-full px-2 py-0 my-1 font-bold text-center comillas">
        {game.sessionName}
      </span>
      <span className="flex flex-row items-center justify-center">
        <Crown />
        <span className="clamp-1">{game.admin.name}</span>
      </span>
      {game.gameStatus === "new" && (
        <span className="flex flex-row items-center justify-center">
          <SandClock />
          <span className="clamp-1">
            {game.rounds === 1 ? "1 round" : `${game.rounds} rounds`}
          </span>
        </span>
      )}
      {game.gameStatus === "playing" && (
        <>
          <span className="flex flex-row items-center justify-center">
            <SandClock />
            <span className="clamp-1">
              {game.currentRound}/{game.rounds}
            </span>
          </span>
          <span className="flex flex-row items-center justify-center">
            <Users />
            <span className="clamp-1">{game.currentPlayer.name}'s turn</span>
          </span>
        </>
      )}
      {game.players.length > 0 && game.gameStatus !== "playing" && (
        <span className="flex flex-row items-center justify-center">
          <Users />
          <span>{game.players.length} players</span>
        </span>
      )}
    </li>
  );
};

export default Game;
