import React from "react";
import AppCtx from "../context/AppContext";

const GameViewText = () => {
  const { status, setStatus } = React.useContext(AppCtx);

  const [corpse, setCorpse] = React.useState<Corpse>(
    status.currentViewedGame as Corpse
  );
  const [text, setText] = React.useState("");

  const validateText = (text: string) => {
    // check that text has more than 40 characters and more than 5 words
    // TODO: this numbers can be variables
    const val = text.length > 40 && text.split(" ").length > 5 ? true : false;
    return val;
  };

  let error = "";

  const handleNewtext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateText(text)) {
      console.log("valid text");
      // 3 last words from the previous round
      const spoiler =
        corpse.corpse.length > 0
          ? corpse.corpse[corpse.corpse.length - 1]
              .split(" ")
              .slice(-3)
              .join(" ")
          : "You are the first one";
      const turn = corpse.turnID++;
      const round = Math.floor(Math.abs(turn / corpse.players.length)) + 1;
      // find next player
      const nextPlayer = corpse.players[(turn + 1) % corpse.players.length];
      console.log("Player index: ", turn % corpse.players.length);
      console.log(
        "Cambiando el turno ",
        corpse.currentPlayer.address,
        nextPlayer.address
      );

      const texts = [...corpse.corpse, text];

      const gameStatus =
        turn === corpse.players.length * corpse.rounds - 1
          ? "closed"
          : "playing";

      const newCorpse = {
        ...corpse,
        gameStatus: gameStatus,
        currentPlayer: nextPlayer,
        currentRound: round,
        corpse: texts,
        spoiler: spoiler,
      };

      const info = `${corpse.sessionName} updated!`;
      window.webxdc.sendUpdate({ payload: newCorpse }, info);
      setCorpse(newCorpse as Corpse);
      setStatus({
        ...status,
        currentViewedGame: newCorpse as Corpse,
        currentPlayingGame: newCorpse as Corpse,
      });
    } else {
      console.log("invalid text");
      error = "Invalid text";
    }
  };

  return (
    <>
      <h3>It's your turn</h3>
      <p>Description blah blah blah</p>
      <form
        className="flex flex-col items-center justify-center p-2"
        onSubmit={handleNewtext}
      >
        <textarea
          name="text"
          id="text"
          cols={50}
          rows={5}
          className="p-2 m-2 border border-black rounded-lg"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="px-4 my-2 border border-primario rounded-xl"
          type="submit"
        >
          Accept
        </button>
      </form>
      {error.length > 0 && <p>{error}</p>}
    </>
  );
};

export default GameViewText;
