import React, { useEffect } from "react";
import PlayerList from "./PlayerList";
import AppCtx from "../context/AppContext";
import GameViewNew from "./GameViewNew";
import GameViewText from "./GameViewText";
import GameViewClosed from "./GameViewClosed";

const GameView: React.FC<{ game: Corpse }> = ({ game }) => {
  const { status } = React.useContext(AppCtx);

  return (
    <>
      <h2 className="p-2 m-2 overflow-hidden text-4xl font-bold text-center break-words max-w-2xl w-[80vw] comillas">
        {game.sessionName.length > 63
          ? game.sessionName.slice(0, 60) + "..."
          : game.sessionName}
      </h2>
      {game.gameStatus === "playing" && (
        <p>
          ⌛ {game.currentRound}/{game.rounds} Turn: {game.turnID}/
          {game.players.length * game.rounds}
        </p>
      )}

      {game.gameStatus === "new" && (
        <>
          {status.playerAddr !== status.currentViewedGame?.admin.address ? (
            <PlayerList players={status.currentViewedGame?.players as Player[]}>
              <h3 className="font-bold">Players</h3>
            </PlayerList>
          ) : (
            <PlayerListAdmin
              adminAddr={status.playerAddr}
              game={status.currentViewedGame}
            />
          )}
          <GameViewNew game={game} />
        </>
      )}
      {game.gameStatus === "playing" && (
        <>
          {status.currentViewedGame?.currentPlayer.address ===
          status.playerAddr ? (
            <>
              {status.playerAddr !== status.currentViewedGame.admin.address ? (
                <PlayerList
                  players={
                    status.currentViewedGame.sessionName ===
                    status.currentPlayingGame?.sessionName
                      ? (status.currentPlayingGame?.players as Player[])
                      : (status.currentViewedGame.players as Player[])
                  }
                >
                  <h3 className="font-bold">Players</h3>
                </PlayerList>
              ) : (
                <PlayerListAdmin
                  adminAddr={status.playerAddr}
                  game={
                    status.currentViewedGame.sessionName ===
                    status.currentPlayingGame?.sessionName
                      ? status.currentPlayingGame
                      : status.currentViewedGame
                  }
                />
              )}
              <GameViewText />
            </>
          ) : (
            <p>It's {status.currentViewedGame?.currentPlayer.name}'s turn</p>
          )}
        </>
      )}
      {game.gameStatus === "closed" && <GameViewClosed game={game} />}
    </>
  );
};

export default GameView;

const PlayerListAdmin: React.FC<{
  game: Corpse;
  adminAddr: string;
}> = ({ game, adminAddr }) => {
  return (
    <>
      <ul className="flex flex-col items-start justify-center max-w-2xl px-4 py-2 m-2 btn-style">
        <h3 className="font-bold">Players</h3>
        {game.players
          .filter((player) => !player.deleted)
          .map((player: Player) => {
            return (
              <li
                key={player.address}
                className="flex flex-row items-center justify-start"
              >
                <span className="mr-auto clamp-1">{player.name}</span>
                {player.address !== adminAddr && (
                  <Delete
                    playerAddr={player.address}
                    sessionName={game.sessionName}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

const Delete: React.FC<{ playerAddr: string; sessionName: string }> = ({
  playerAddr,
  sessionName,
}) => {
  const { status, setStatus } = React.useContext(AppCtx);
  const deletePlayer = () => {
    const currentGame = status.games.find(
      (game) => game.sessionName === sessionName
    );
    const activePlayers = currentGame?.players.filter(
      (player) => !player.deleted
    ).length;
    // console.log(activePlayers);
    if (currentGame && activePlayers && activePlayers > 2) {
      console.log("Vamos a eliminar a ", playerAddr);
      const index = status.games.findIndex(
        (game) => game.sessionName === sessionName
      );
      console.log(
        "before ",
        status.games[index].players.filter(
          (player) => playerAddr === player.address
        )
      );
      status.games[index].players = status.games[index].players.map((player) =>
        player.address === playerAddr ? { ...player, deleted: true } : player
      );
      console.log(
        "after ",
        status.games[index].players.filter(
          (player) => playerAddr === player.address
        )
      );
    } else {
      alert("Can't do that. Only 2 players left");
    }
  };
  return (
    <button onClick={deletePlayer} className="ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 hover:text-red-900 focus:text-red-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};
