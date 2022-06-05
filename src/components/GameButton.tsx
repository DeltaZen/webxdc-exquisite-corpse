import React from "react";
import AppCtx from "../context/AppContext";
import Marker from "./Marker";
import { SandClock, Crown, Users } from "./icons";

const Game: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status, setStatus } = React.useContext(AppCtx);
  return (
    <li
      className="relative flex flex-col items-start justify-between px-2 m-4 cursor-pointer btn-style min-w-[120px]"
      onClick={() => {
        setStatus({ ...status, currentViewedGame: game });
      }}
    >
      <Marker />
      <span className="max-w-full p-2 font-bold text-center comillas clamp">
        {game.sessionName}
      </span>
      <span className="flex flex-row items-center justify-center">
        <Crown />
        {game.admin.name}
      </span>
      {game.gameStatus === "new" && (
        <span className="flex flex-row items-center justify-center">
          <SandClock />
          {game.rounds}
        </span>
      )}
      {game.gameStatus === "playing" && (
        <span className="flex flex-row items-center justify-center">
          <SandClock />
          {game.currentRound}/{game.rounds}
        </span>
      )}
      {game.players.length > 0 && (
        <span className="flex flex-row items-center justify-center">
          <Users />
          {game.players.length}
        </span>
      )}
    </li>
  );
};

export default Game;
