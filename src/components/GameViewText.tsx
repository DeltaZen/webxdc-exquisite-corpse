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
    // check that text has more than 20 words
    // TODO: this numbers can be variables
    const val = text.split(" ").length > 20 ? true : false;
    return val;
  };

  const handleNewtext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateText(text)) {
      setError({ ...error, text: undefined });
      // 3 last words from the previous round
      const spoiler = "Spoiler: " + text.split(" ").slice(-5).join(" ");
      const turn = corpse.turnID++;
      const round = Math.floor(Math.abs(turn / corpse.players.length)) + 1;
      // find next player
      const nextPlayer = corpse.players[turn % corpse.players.length];

      const texts = [...corpse.corpse, text];

      const gameStatus =
        turn === corpse.players.length * corpse.rounds ? "closed" : "playing";

      const newCorpse = {
        ...corpse,
        gameStatus: gameStatus,
        currentPlayer: nextPlayer,
        currentRound: round,
        corpse: texts,
        spoiler: spoiler,
      };

      const info = `Round ${corpse.currentRound}/${corpse.rounds}: ${nextPlayer.name}, it's your turn`;
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
        text: "Invalid text. Check that it has more than 5 words",
      });
    }
  };

  return (
    <>
      {corpse.spoiler.startsWith("Spoiler: ") && <h3>It's your turn</h3>}
      {corpse.spoiler.startsWith("Spoiler: ") && (
        <p className="p-2 mx-2">
          You can now continue what the last player wrote...
        </p>
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
        {error.text && (
          <span className="p-2 mx-4 my-2 text-red-500">{error.text}</span>
        )}
        <button className="btn-simple" type="submit">
          End turn
        </button>
      </form>
    </>
  );
};

export default GameViewText;
