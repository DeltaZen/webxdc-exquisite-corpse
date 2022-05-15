import React from "react";
import AppCtx from "../context/AppContext";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  return (
    <>
      <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>

      <p>{text}</p>
    </>
  );
};

export default GameViewClosed;
