import React from "react";
import AppCtx from "../context/AppContext";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  return (
    <>
      <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>
      {game.corpse.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  );
};

export default GameViewClosed;
