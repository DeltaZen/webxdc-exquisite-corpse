import React from "react";
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

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);

  const startGame = (game: Corpse) => {
    const newgame = { ...game, gameStatus: "playing" as "playing" };
    //console.log(newgame);
    const info = `${newgame.admin.name} started "${newgame.sessionName}" in Exquisite Corpse`;
    window.webxdc.sendUpdate({ payload: newgame }, info);
    return newgame;
  };

  const joinGame = (game: Corpse) => {
    const { players } = game;
    const playerList = players.map((player) => player.address);
    if (!playerList.includes(ctx.playerAddr)) {
      const newPlayers = [
        ...players,
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
      <h2 className="m-2 mx-auto text-2xl font-bold">{game.sessionName}</h2>
      <h3 className="font-bold">Players</h3>
      <ul>
        {game.players.map((player: Player) => {
          return <li key={player.address}>{player.name}</li>;
        })}
      </ul>
      {ctx?.playerName === game.admin.name ? (
        <>
          <p>You are admin here</p>
          {ctx.currentGame?.gameStatus === "new" && (
            <button
              className="px-4 my-2 border border-primario rounded-xl"
              onClick={() => ctx?.toggleCurrentGame(startGame(game))}
            >
              Start Game
            </button>
          )}
        </>
      ) : (
        <>
          <p>Not your game</p>
          <p>
            Admin: {game.admin.name} ({game.admin.address})
          </p>
          {game.gameStatus === "new" ? (
            <button
              className="px-4 my-2 border border-primario rounded-xl"
              onClick={() => ctx?.toggleCurrentGame(joinGame(game))}
            >
              Join Game
            </button>
          ) : null}
        </>
      )}
    </>
  );
};

export default GameView;
