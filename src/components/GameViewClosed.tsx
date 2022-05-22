import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  return (
    <>
      <p className="px-2 max-w-prose first-letter:font-fancy first-letter:text-6xl">
        {text}
      </p>
    </>
  );
};

export default GameViewClosed;
