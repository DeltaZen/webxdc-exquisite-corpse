import React from "react";
import AppCtx from "../context/AppContext";

const GameViewNew: React.FC<{ game: Corpse }> = ({ game }) => {
  //const ctx = React.useContext(AppCtx);
  const [error, setError] = React.useState<InputError>({});

  const playerList = game.players.map((player) => player.address);

  const startGame = (game: Corpse, send: boolean) => {
    const newgame = { ...game, gameStatus: "playing" as "playing" };
    //console.log(newgame);
    const info = `${newgame.admin.name} started "${newgame.sessionName}" in Exquisite Corpse`;
    send && window.webxdc.sendUpdate({ payload: newgame }, info);
    return newgame;
  };

  const joinGame = (
    game: Corpse,
    playerName: string,
    playerAddr: string,
    send: boolean
  ) => {
    if (!playerList.includes(playerAddr)) {
      const newPlayers = [
        ...game.players,
        { name: playerName, address: playerAddr },
      ];
      const newGame = { ...game, players: newPlayers };
      // send update
      const info = `${newGame.admin.name} joined ${newGame.sessionName}`;
      send && window.webxdc.sendUpdate({ payload: newGame }, info);
      return newGame;
    }
  };

  const handleStart = (
    game: Corpse,
    status: IndexProps,
    setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
  ) => {
    if (game.players.length > 1) {
      setError({});
      setStatus({
        ...status,
        currentViewedGame: startGame(game, false),
        currentPlayingGame: startGame(game, true),
      });
    } else {
      setError({ ...error, players: "Need at least 2 players to start" });
    }
  };

  const handleJoin = (
    game: Corpse,
    status: IndexProps,
    setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
  ) => {
    setStatus({
      ...status,
      currentViewedGame: joinGame(
        game,
        status.playerName,
        status.playerAddr,
        false
      ),
      currentPlayingGame: joinGame(
        game,
        status.playerName,
        status.playerAddr,
        true
      ),
    });
  };

  return (
    <AppCtx.Consumer>
      {({ status, setStatus }) =>
        status.playerName === game.admin.name ? (
          <>
            <p>Owner: you</p>
            <button
              className="px-4 my-2 border border-primario rounded-xl"
              onClick={() => handleStart(game, status, setStatus)}
            >
              Start Game
            </button>
            {error.players && (
              <span className="text-red-500">{error.players}</span>
            )}
          </>
        ) : (
          <>
            <p>
              Owner: {game.admin.name} ({game.admin.address})
            </p>
            {!playerList.includes(status.playerAddr) && (
              <button
                className="px-4 my-2 border border-primario rounded-xl"
                onClick={() => handleJoin(game, status, setStatus)}
              >
                Join Game
              </button>
            )}
          </>
        )
      }
    </AppCtx.Consumer>
  );
};

export default GameViewNew;
