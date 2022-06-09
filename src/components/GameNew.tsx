import React, { useEffect, useState } from "react";
import AppCtx from "../context/AppContext";

const NewGame = () => {
  const { status, setStatus } = React.useContext(AppCtx);

  const playerName = window.webxdc.selfName;
  const playerAddr = window.webxdc.selfAddr;

  const [corp, setCorp] = useState<Corpse>({
    sessionName: "",
    admin: { name: playerName, address: playerAddr },
    gameStatus: "new",
    players: [{ name: playerName, address: playerAddr }],
    currentPlayer: { name: playerName, address: playerAddr },
    rounds: 3,
    words: 20,
    spoilerWords: 5,
    currentRound: 0,
    turnID: 0,
    corpse: [],
    spoiler: "",
  });

  const [showError, setShowError] = useState(false);

  const [name, setName] = useState("");
  const [rounds, setRounds] = useState(corp.rounds.toString());
  const [words, setWords] = useState(corp.words.toString());
  const [spoilerWords, setSpoilerWords] = useState(
    corp.spoilerWords.toString()
  );

  const [error, setError] = useState<InputError>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      parseInt(rounds) > 0 &&
      corp.sessionName !== "" &&
      !error.text &&
      parseInt(words) > 0 &&
      parseInt(spoilerWords) > 0 &&
      parseInt(spoilerWords) <= parseInt(words)
    ) {
      setShowError(false);
      setError({});
      const numWords = parseInt(words);
      const numSpoilerWords = parseInt(spoilerWords);
      const numRounds = parseInt(rounds);
      const newGame = {
        ...corp,
        rounds: numRounds,
        words: numWords,
        spoilerWords: numSpoilerWords,
      };
      setCorp(newGame);
      const info = `${corp.admin.name} created "${corp.sessionName}". Join!`;
      // checking game info
      console.log(newGame);

      window.webxdc.sendUpdate({ payload: newGame, info: info }, info);
      setStatus({
        ...status,
        currentViewedGame: newGame,
        view: "list",
      });
    } else if (name === "") {
      setShowError(true);
      setError({ ...error, sessionName: "Session name can't be empty" });
    } else {
      setShowError(true);
      console.log(rounds, isNaN(parseInt(words)));
      const text = `${name === "" ? " Session name can't be empty" : ""}${
        parseInt(rounds) > 0 ? "" : " Wrong number of rounds."
      }${parseInt(words) > 0 ? "" : " Text must be at least 1 word long."}${
        parseInt(spoilerWords) > 0
          ? ""
          : " Preview must contain at least 1 word."
      }${
        parseInt(spoilerWords) > parseInt(words)
          ? " Preview can't be bigger than minimum text length."
          : ""
      }`;
      setError({ ...error, text: text });
      console.log("invalid game", error);
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
      setCorp({ ...corp, sessionName: editedName });
    }
  };

  return (
    <div className="wrap">
      <h3 className="my-4 text-4xl font-bold fl">New Story</h3>
      {showError && (
        <p className="p-2 px-3 mx-auto font-mono text-base text-center text-red-500 max-w-prose wrap">
          {error.text && <span className="text-red-500">{error.text}</span>}
        </p>
      )}
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
          className="w-full px-1 mb-4 text-center"
          min={1}
          onChange={(e) => setRounds(e.target.value)}
          value={rounds}
        />
        {error.rounds && (
          <span className="px-1 text-center text-red-500">{error.rounds}</span>
        )}
        <label className="px-1 text-center">Minimum Text Length</label>
        <input
          id="words"
          type="number"
          className="w-full px-1 mb-4 text-center"
          min={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWords(e.target.value)
          }
          value={words}
        />
        <label className="px-1 text-center">Preview Length</label>
        <input
          id="spoilerWords"
          type="number"
          className="w-full px-1 mb-4 text-center"
          min={1}
          onChange={(e) => setSpoilerWords(e.target.value)}
          value={spoilerWords}
        />
        <button className="btn-simple btn-style" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewGame;
