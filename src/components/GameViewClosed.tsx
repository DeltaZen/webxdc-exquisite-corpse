import React from "react";

const GameViewClosed: React.FC<{ game: Corpse }> = ({ game }) => {
  const text = game.corpse.join(" ");
  const authors = game.players.map((p) => p.name).join(", ");
  console.log(new Date(game.date ?? 0));
  const fecha = game.date
    ? new Date(game.date).toLocaleDateString("en-US")
    : "-";
  return (
    <div className="flex flex-col items-center justify-center max-w-prose">
      <p className="px-2 my-2 ml-auto font-serif text-red-900">By: {authors}</p>
      {fecha && (
        <p className="px-2 my-2 ml-auto font-mono text-base font-thin text-red-900">
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
