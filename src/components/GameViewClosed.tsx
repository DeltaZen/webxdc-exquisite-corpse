import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  const authors = game.players.map((p) => p.name).join(", ");
  return (
    <div className="max-w-prose flex flex-col items-center justify-center">
      <p className="my-2 font-serif text-red-900 ml-auto">By: {authors}</p>
      {game.date && (
        <p className="font-thin text-base text-red-900 my-2 font-mono ml-auto">
          {game.date.toLocaleDateString("en")}
        </p>
      )}
      <p className="px-2 first-letter:font-fancy first-letter:text-6xl">
        {text}
      </p>
    </div>
  );
};

export default GameViewClosed;
