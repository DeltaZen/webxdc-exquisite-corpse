import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  const authors = game.players.map((p) => p.name).join(", ");
  console.log(new Date(game.date ?? 0));
  const fecha = game.date
    ? new Date(game.date).toLocaleDateString("en-US")
    : "-";
  return (
    <div className="max-w-prose flex flex-col items-center justify-center">
      <p className="my-2 font-serif text-red-900 ml-auto">By: {authors}</p>
      {fecha && (
        <p className="font-thin text-base text-red-900 my-2 font-mono ml-auto">
          {fecha}
        </p>
      )}
      <p className="px-2 first-letter:font-fancy first-letter:text-6xl">
        {text}
      </p>
    </div>
  );
};

export default GameViewClosed;
