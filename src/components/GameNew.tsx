import React, { useEffect, useState } from "react";
import AppCtx from "../context/AppContext";

const NewGame = () => {
  const { status, setStatus } = React.useContext(AppCtx);

  const playerName = window.webxdc.selfName;
  const playerAddr = window.webxdc.selfAddr;

  const [game, setGame] = useState<Corpse>({
    sessionName: "",
    admin: { name: playerName, address: playerAddr },
    gameStatus: "new",
    players: [{ name: playerName, address: playerAddr }],
    currentPlayer: { name: playerName, address: playerAddr },
    rounds: 1,
    words: 20,
    spoilerWords: 5,
    currentRound: 0,
    turnID: 0,
    corpse: [],
    spoiler: "",
  });

  const [name, setName] = useState("");

  const [error, setError] = useState<InputError>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      game.rounds > 0 &&
      game.sessionName !== "" &&
      !error.sessionName &&
      game.words > 4 &&
      game.spoilerWords > 2 &&
      game.spoilerWords <= game.words
    ) {
      setError({});
      const info = `${game.admin.name} created "${game.sessionName}". Join!`;
      window.webxdc.sendUpdate({ payload: game, info: info }, info);
      setStatus({
        ...status,
        currentViewedGame: game,
        view: "list",
      });
    } else if (name === "") {
      setError({ ...error, sessionName: "Session name can't be empty" });
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
    const gameList = status.games.map((game) => game.sessionName);
    const editedName = e.target.value.trim().replace(/\s+/g, " ");
    if (gameList.includes(editedName)) {
      setError({ ...error, sessionName: "Session name already exists" });
    } else if (editedName === "" || editedName === " ") {
      setError({ ...error, sessionName: "Session name can't be empty" });
    } else if (editedName.length > 150) {
      setError({
        ...error,
        sessionName: "Session name can't be more than 150 characters long",
      });
    } else {
      setError({ ...error, sessionName: undefined });
      setGame({ ...game, sessionName: editedName });
    }
  };

  return (
    <div className="wrap">
      <h3 className="my-4 text-4xl font-bold fl">New Story</h3>
      <form className="p-2 wrap" onSubmit={handleSubmit}>
        <label className="px-1 text-center">Name</label>
        <input
          id="sessionName"
          type="text"
          className="w-full px-1 mb-4 text-center"
          onChange={handleName}
          value={name}
        />
        {error.sessionName && (
          <span className="text-red-500">{error.sessionName}</span>
        )}
        <label className="px-1 text-center">Rounds</label>
        <input
          id="rounds"
          type="number"
          placeholder="Rounds"
          className="w-full px-1 mb-4 text-center"
          min={1}
          onChange={(e) =>
            setGame({ ...game, rounds: parseInt(e.target.value) })
          }
          value={game.rounds}
        />
        <label className="px-1 text-center">Minimum Text Length</label>
        <input
          id="words"
          type="number"
          className="w-full px-1 mb-4 text-center"
          min={1}
          onChange={(e) =>
            setGame({ ...game, words: parseInt(e.target.value) })
          }
          value={game.words}
        />
        <label className="px-1 text-center">Preview Length</label>
        <input
          id="spoilerWords"
          type="number"
          placeholder="Spoiler Words"
          className="w-full px-1 mb-4 text-center"
          min={1}
          max={game.words}
          onChange={(e) =>
            setGame({ ...game, spoilerWords: parseInt(e.target.value) })
          }
          value={game.spoilerWords}
        />
        <button className="btn-simple" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewGame;
