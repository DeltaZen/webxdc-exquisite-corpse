import React, { useEffect, useState } from "react";
import AppCtx from "../context/AppContext";

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
    rounds: 1,
    words: 20,
    currentRound: 0,
    turnID: 0,
    corpse: [],
    spoiler: "",
  });

  const [error, setError] = useState<InputError>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const gameList = status.games.map((game) => game.sessionName);
    if (game.rounds > 0 && game.sessionName !== "" && !error.sessionName) {
      setError({});
      const info = `${game.admin.name} created "${game.sessionName}". Join!`;
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
    <div className="wrap">
      <h3 className="text-2xl font-bold first-letter:font-fancy first-letter:text-4xl first-letter:text-red-900">
        New Story
      </h3>
      <form className="p-2 wrap" onSubmit={handleSubmit}>
        <label className="px-1 text-center">Name</label>
        <input
          id="sessionName"
          type="text"
          className="px-1 mb-4 text-center"
          onChange={handleName}
        />
        {error.sessionName && (
          <span className="text-red-500">{error.sessionName}</span>
        )}
        <label className="px-1 text-center">Rounds</label>
        <input
          id="rounds"
          type="number"
          placeholder="Rounds"
          className="px-1 mb-4 text-center"
          min={1}
          onChange={(e) =>
            setGame({ ...game, rounds: parseInt(e.target.value) })
          }
          value={game.rounds}
        />
        <label className="px-1 text-center">Words (min)</label>
        <input
          id="words"
          type="number"
          placeholder="Words (min)"
          className="px-1 mb-4 text-center"
          min={5}
          onChange={(e) =>
            setGame({ ...game, words: parseInt(e.target.value) })
          }
          value={game.words}
        />
        <button className="btn-simple" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewGame;
