import React from "react";
import AppCtx from "../context/AppContext";

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

const GameViewText = () => {
  const ctx = React.useContext(AppCtx);

  //   const playerName = window.webxdc.selfName;
  //   const playerAddr = window.webxdc.selfAddr;

  const [corpse, setCorpse] = React.useState<Corpse>(ctx.currentGame as Corpse);
  const [text, setText] = React.useState("");

  const validateText = (text: string) => {
    // check that text has more than 40 characters and more than 5 words
    const val = text.length > 40 && text.split(" ").length > 5 ? true : false;
    return val;
  };

  const handleNewtext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    if (validateText(text)) {
      // 3 last words from the previous round
      const spoiler =
        corpse.corpse.length > 0
          ? corpse.corpse[corpse.corpse.length - 1]
              .split(" ")
              .slice(-3)
              .join(" ")
          : "You are the first one";
      const turn = corpse.turnID++;
      const round = Math.abs(turn / corpse.players.length) + 1;
      // find next player
      const nextPlayer = corpse.players[turn % corpse.players.length];
      console.log(ctx.currentGame);
      console.log(nextPlayer);

      const texts = [...corpse.corpse, text];

      const gameStatus =
        turn === corpse.players.length * corpse.rounds - 1
          ? "closed"
          : "playing";

      const newCorpse = {
        ...corpse,
        gameStatus,
        currentPlayer: nextPlayer,
        currentRound: round,
        corpse: texts,
        spoiler,
      };

      //   ctx.toggleCurrentGame(newCorpse as Corpse);
      setCorpse(newCorpse as Corpse);
      const info = `${corpse.sessionName} updated!`;
      window.webxdc.sendUpdate({ payload: newCorpse }, info);
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
    </>
  );
};

export default GameViewText;
