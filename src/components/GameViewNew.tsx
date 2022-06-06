import React from "react";
import AppCtx from "../context/AppContext";

const GameViewNew: React.FC<{ game: Corpse }> = ({ game }) => {
  const [error, setError] = React.useState<InputError>({});

  const playerList = game.players.map((player) => player.address);

  const startGame = (game: Corpse, send: boolean) => {
    const newgame = {
      ...game,
      gameStatus: "playing" as "playing",
      currentRound: 1,
      turnID: 1,
      spoiler: "You are the first one",
      currentPlayer: game.players[0],
    };
    // choose first player
    const info = `[Round ${newgame.currentRound}/${newgame.rounds}] ${newgame.currentPlayer.name}, it's your turn`;
    send && window.webxdc.sendUpdate({ payload: newgame, info: info }, info);
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
      const info = `${playerName} joined "${newGame.sessionName}"`;
      send && window.webxdc.sendUpdate({ payload: newGame, info: info }, info);
      return newGame;
    }
  };

  const handleStart = (
    game: Corpse,
    status: IndexProps,
    setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
  ) => {
    if (game.players.length > 1) {
      // shuffle player list
      shuffleArray(game.players);

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
        status.playerAddr === game.admin.address ? (
          <div className="text-center">
            <p>Owner: you</p>
            <button
              className="btn btn-style"
              onClick={() => handleStart(game, status, setStatus)}
            >
              Start Game
            </button>
            {error.players && <p className="text-red-500">{error.players}</p>}
          </div>
        ) : (
          <div className="text-center">
            <p>
              Owner: {game.admin.name} ({game.admin.address})
            </p>
            {!playerList.includes(status.playerAddr) && (
              <button
                className="btn-simple btn-style"
                onClick={() => handleJoin(game, status, setStatus)}
              >
                Join Game
              </button>
            )}
          </div>
        )
      }
    </AppCtx.Consumer>
  );
};

export default GameViewNew;

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
