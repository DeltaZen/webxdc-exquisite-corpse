import React from "react";

const GameTutorial = () => {
  return (
    <div className="text-2xl text-justify wrap max-w-prose ">
      <h2 className="my-4 text-4xl font-bold fl">How to play</h2>
      <p className="w-full p-2 px-4 fl">
        Start a <span className="text-red-900">new story</span> or join another
        one. The first player chooses the name, the number of rounds, the
        minimum text length (in words) of every player input and the amount of
        words each player will see of what the previous one wrote (as a{" "}
        <span className="text-red-900">hint or spoiler</span>).
      </p>
      <p className="w-full p-2 px-4 fl">
        Once the game starts, each player (except the first one) will see the
        above mentionated <span className="text-red-900">hint</span> and must
        use them to continue the development of the{" "}
        <span className="text-red-900">story</span>.
      </p>
      <p className="w-full p-2 px-4 fl">
        In the <span className="text-red-900">library</span> you can find the
        finished games and appreciate the real art.
      </p>
    </div>
  );
};

export default GameTutorial;
