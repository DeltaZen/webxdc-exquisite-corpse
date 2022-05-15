import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  return (
    <>
      <p className="max-w-prose">{text}</p>
    </>
  );
};

export default GameViewClosed;
