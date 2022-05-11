import React, { useEffect, useState } from "react";
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
}

interface Player {
  name: string;
  address: string;
}

const NewGame = () => {
  const playerName = window.webxdc.selfName;
  const playerAddr = window.webxdc.selfAddr;

  const [corpse, setCorpse] = useState<Corpse>({
    sessionName: playerName,
    admin: { name: playerName, address: playerAddr },
    gameStatus: "new",
    players: [{ name: playerName, address: playerAddr }],
    currentPlayer: { name: playerName, address: playerAddr },
    rounds: 0,
    currentRound: 0,
    turnID: 0,
    corpse: [],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (corpse.rounds > 1 && corpse.sessionName !== "") {
      const info = `${corpse.admin.name} created ${corpse.sessionName} with ${corpse.rounds} rounds`;
      window.webxdc.sendUpdate({ payload: corpse }, info);
    }
  };

  return (
    <>
      {/* <h1>Name: {corpse.sessionName}</h1>
      <p>Rounds: {corpse.rounds}</p> */}

      <form
        className="flex flex-col items-center justify-center p-2"
        onSubmit={handleSubmit}
      >
        <input
          id="sessionName"
          type="text"
          placeholder="Session Name"
          className="px-1 my-4 dark:bg-gray-800 dark:focus:bg-gray-900 dark:text-white "
          onChange={(e) =>
            setCorpse({ ...corpse, sessionName: e.target.value })
          }
        />
        <input
          id="rounds"
          type="number"
          placeholder="Rounds"
          className="px-1 my-4 dark:bg-gray-800 dark:focus:bg-gray-900 dark:text-white "
          max={10}
          min={2}
          onChange={(e) =>
            setCorpse({ ...corpse, rounds: parseInt(e.target.value) })
          }
        />
        <button
          className="px-4 border border-primario rounded-xl"
          type="submit"
        >
          Create
        </button>
      </form>

      <h2>List of players</h2>
      <PlayerList players={corpse.players} />
    </>
  );
};

export default NewGame;
