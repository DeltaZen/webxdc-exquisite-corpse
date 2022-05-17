import React from "react";

const GameTutorial = () => {
  return (
    <div className="text-justify wrap max-w-prose">
      <h2 className="text-2xl font-bold">How to play</h2>
      <p className="w-full p-2 fl">
        Start a new story or join another one. The first player chooses the name
        and the number of rounds.
      </p>
      <p className="w-full p-2 fl">
        Once the game starts, each player (except the first one) will see a hint
        of the last words written by the previous player and must use them to
        continue the development of the story.
      </p>
      <p className="w-full p-2 fl">
        In the <span className="text-red-900">library</span> you can find the
        finished games and appreciate the real art.
      </p>
    </div>
  );
};

export default GameTutorial;
