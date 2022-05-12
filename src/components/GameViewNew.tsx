import React from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";

interface Corpse {
  sessionName: string;
  admin: Player;
  gameStatus: "new" | "playing" | "closed";
  players: Player[];
  currentPlayer: Player;
  rounds: number;
  currentRound: number;
  turnID: number;
  corpse: string[];
}

interface Player {
  name: string;
  address: string;
}

const GameViewNew: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);

  const startGame = (game: Corpse) => {
    const newgame = { ...game, gameStatus: "playing" as "playing" };
    //console.log(newgame);
    const info = `${newgame.admin.name} started "${newgame.sessionName}" in Exquisite Corpse`;
    window.webxdc.sendUpdate({ payload: newgame }, info);
    return newgame;
  };

  const joinGame = (game: Corpse) => {
    const playerList = game.players.map((player) => player.address);
    if (!playerList.includes(ctx.playerAddr)) {
      const newPlayers = [
        ...game.players,
        { name: ctx.playerName, address: ctx.playerAddr },
      ];
      const newGame = { ...game, players: newPlayers };
      // send update
      const info = `${newGame.admin.name} joined ${newGame.sessionName}`;
      window.webxdc.sendUpdate({ payload: newGame }, info);
      return newGame;
    }
  };
  return (
    <>
      {ctx?.playerName === game.admin.name ? (
        <>
          <p>Owner: you</p>
          <button
            className="px-4 my-2 border border-primario rounded-xl"
            onClick={() => ctx?.toggleCurrentGame(startGame(game))}
          >
            Start Game
          </button>
        </>
      ) : (
        <>
          <p>
            Owner: {game.admin.name} ({game.admin.address})
          </p>
          <button
            className="px-4 my-2 border border-primario rounded-xl"
            onClick={() => ctx?.toggleCurrentGame(joinGame(game))}
          >
            Join Game
          </button>
        </>
      )}
    </>
  );
};

export default GameViewNew;
