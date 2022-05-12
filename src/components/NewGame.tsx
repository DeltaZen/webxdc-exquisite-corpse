import React, { useEffect, useState } from "react";
import AppCtx from "../context/AppContext";
import PlayerList from "./PlayerList";

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
  spoiler: string;
}

interface Player {
  name: string;
  address: string;
}

const NewGame = () => {
  const { status, setStatus } = React.useContext(AppCtx);

  const playerName = window.webxdc.selfName;
  const playerAddr = window.webxdc.selfAddr;

  const [game, setGame] = useState<Corpse>({
    sessionName: playerName,
    admin: { name: playerName, address: playerAddr },
    gameStatus: "new",
    players: [{ name: playerName, address: playerAddr }],
    currentPlayer: { name: playerName, address: playerAddr },
    rounds: 0,
    currentRound: 0,
    turnID: 0,
    corpse: [],
    spoiler: "",
  });

  // TODO: session name must be unique
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (game.rounds > 1 && game.sessionName !== "") {
      const info = `${game.admin.name} created ${game.sessionName} with ${game.rounds} rounds. Join!`;
      window.webxdc.sendUpdate({ payload: game, info: info }, info);
      setStatus({
        ...status,
        currentViewedGame: game,
        view: "list",
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center p-2"
        onSubmit={handleSubmit}
      >
        <input
          id="sessionName"
          type="text"
          placeholder="Session Name"
          className="px-1 my-4"
          onChange={(e) => setGame({ ...game, sessionName: e.target.value })}
        />
        <input
          id="rounds"
          type="number"
          placeholder="Rounds"
          className="px-1 my-4"
          max={10}
          min={2}
          onChange={(e) =>
            setGame({ ...game, rounds: parseInt(e.target.value) })
          }
        />
        <button
          className="px-4 border border-primario rounded-xl"
          type="submit"
        >
          Create
        </button>
      </form>

      <PlayerList players={game.players}>
        <h2 className="font-bold">Players</h2>
      </PlayerList>
    </>
  );
};

export default NewGame;
