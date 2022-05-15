import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  return (
    <>
      <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>

      <p className="max-w-prose">{text}</p>
    </>
  );
};

export default GameViewClosed;
