import React, { useEffect, useState } from "react";
import AppCtx from "../context/AppContext";
import PlayerList from "./PlayerList";

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

  const [error, setError] = useState<InputError>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const gameList = status.games.map((game) => game.sessionName);
    if (game.rounds > 1 && game.sessionName !== "" && !error.sessionName) {
      setError({});
      const info = `${game.admin.name} created ${game.sessionName} with ${game.rounds} rounds. Join!`;
      window.webxdc.sendUpdate({ payload: game, info: info }, info);
      setStatus({
        ...status,
        currentViewedGame: game,
        view: "list",
      });
      console.log("created game not working");
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const gameList = status.games.map((game) => game.sessionName);
    const name = e.target.value;
    if (gameList.includes(name)) {
      setError({ ...error, sessionName: "Session name already exists" });
    } else if (name === "") {
      setError({ ...error, sessionName: "Session name can't be empty" });
    } else {
      setError({ ...error, sessionName: undefined });
      setGame({ ...game, sessionName: name });
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
          className="px-1 my-4 text-center"
          onChange={handleName}
        />
        {error.sessionName && (
          <span className="text-red-500">{error.sessionName}</span>
        )}
        <input
          id="rounds"
          type="number"
          placeholder="Rounds"
          className="px-1 my-4"
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
