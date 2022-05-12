import React from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";

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
  spoiler: string;
}

interface Player {
  name: string;
  address: string;
}

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const ctx = React.useContext(AppCtx);

  let isYourTurn = ctx.currentGame?.currentPlayer.address === ctx.playerAddr;

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
      <PlayerList players={game.players}>
        <h3 className="font-bold">Players</h3>
      </PlayerList>

      {game.gameStatus === "new" && <GameViewNew game={game} />}
      {game.gameStatus === "playing" && (
        <p>It's {ctx.currentGame?.currentPlayer.name}'s turn</p>
      )}
      {game.gameStatus === "playing" && (
        <>
          {isYourTurn ? (
            <GameViewText />
          ) : (
            <p>It's {ctx.currentGame?.currentPlayer.name}'s turn</p>
          )}
        </>
      )}
    </>
  );
};

export default GameView;
