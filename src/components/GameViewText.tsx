import React from "react";
import AppCtx from "../context/AppContext";

const GameViewText = () => {
  const { status, setStatus } = React.useContext(AppCtx);

  const [corpse, setCorpse] = React.useState<Corpse>(
    status.currentViewedGame as Corpse
  );
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<InputError>({});

  const validateText = (text: string) => {
    const val = text.split(" ").length >= corpse.words ? true : false;
    return val;
  };

  const handleNewtext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateText(text)) {
      setError({ ...error, text: undefined });
      const spoiler =
        "Spoiler: " + text.split(" ").slice(-corpse.spoilerWords).join(" ");
      let turn = corpse.turnID++;
      // let nextPlayer: Player, gameStatus: "closed" | "playing";

      const round = Math.floor(Math.abs(turn / corpse.players.length)) + 1;

      const texts = [...corpse.corpse, text];

      const gameStatus =
        turn === corpse.players.length * corpse.rounds ? "closed" : "playing";

      const nextPlayer = corpse.players[turn % corpse.players.length];

      const newCorpse = {
        ...corpse,
        gameStatus: gameStatus,
        currentPlayer: nextPlayer,
        currentRound: round,
        corpse: texts,
        spoiler: spoiler,
        date: gameStatus === "closed" ? new Date() : undefined,
      };

      const info =
        gameStatus === "closed"
          ? `"${corpse.sessionName}" has finished, go see the result 👀`
          : `[Round ${corpse.currentRound}/${corpse.rounds}] ${nextPlayer.name}, it's your turn`;
      window.webxdc.sendUpdate({ payload: newCorpse, info: info }, info);
      setCorpse(newCorpse as Corpse);
      setStatus({
        ...status,
        currentViewedGame: newCorpse as Corpse,
        currentPlayingGame: newCorpse as Corpse,
      });
    } else {
      console.log("invalid text");
      setError({
        ...error,
        text: `Invalid text. Check that it has more than ${corpse.words} words`,
      });
    }
  };

  return (
    <>
      {corpse.spoiler.startsWith("Spoiler: ") && (
        <>
          <h3>It's your turn</h3>
          <p className="p-2 mx-2">
            You can now continue what the last player wrote...
          </p>
        </>
      )}
      <p>{corpse.spoiler}</p>
      <form
        className="flex flex-col items-center justify-center p-2 max-w-[100%]"
        onSubmit={handleNewtext}
      >
        <textarea
          name="text"
          id="text"
          cols={50}
          rows={5}
          className="p-2 m-2 border border-black rounded-lg max-w-[90%]"
          onChange={(e) => setText(e.target.value)}
        />
        <p className="p-2 m-2 max-w-[90%]">
          {text.trim().split(/\s+/).length}
          {text.trim().split(/\s+/).length >= corpse.words
            ? ""
            : `/${corpse.words}`}
        </p>
        {error.text && (
          <span className="p-2 mx-4 my-2 text-red-500">{error.text}</span>
        )}
        <button className="btn-simple btn-style" type="submit">
          End turn
        </button>
      </form>
    </>
  );
};

export default GameViewText;
