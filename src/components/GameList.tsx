import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";
import Marker from "./Marker";

const GamesFiltered: React.FC<{ status: IndexProps }> = ({ status }) => {
  const myGames = status.games.filter((game) =>
    game.players.some((player) => player.address === status.playerAddr)
  );
  return (
    <div>
      <StatusGroup games={myGames} gameStatus={"new"} title={"Start"} />
      <StatusGroup games={myGames} gameStatus={"playing"} title={"Playing"} />
      <StatusGroup games={myGames} gameStatus={"closed"} title={"Finished"} />
    </div>
  );
};

const StatusGroup: React.FC<StatusGroupI> = ({ games, gameStatus, title }) => {
  return games.filter((game) => game.gameStatus === gameStatus).length > 0 ? (
    <div className="w-full wrap">
      <h3 className="my-4 text-4xl font-bold fl">{title}</h3>
      <ul className="grid w-full grid-flow-row grid-cols-2 md:grid-cols-3">
        {games
          .filter((game) => game.gameStatus === gameStatus)
          .map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })}
      </ul>
    </div>
  ) : (
    <div className="wrap">
      <h3 className="text-4xl font-bold fl">{title}</h3>
      <p>Sorry, no game found</p>
    </div>
  );
};

const GameList = () => {
  const [options, setOptions] = React.useState<GameGroup>({
    showGroup: false,
    gameStatus: "closed",
    title: "library",
  });
  return (
    <div className="w-full text-justify wrap max-w-prose">
      <AppCtx.Consumer>
        {({ status, setStatus }) =>
          status.currentViewedGame ? (
            <>
              <GameView game={status.currentViewedGame} />
              <button
                onClick={() => {
                  setOptions({ ...options, showGroup: false });
                  setStatus({ ...status, currentViewedGame: undefined });
                }}
                className="btn-simple btn-style"
              >
                Go back
              </button>
            </>
          ) : (
            <>
              {!options.showGroup && options.gameStatus !== "playing" ? (
                <div className="wrap">
                  <h1 className="my-8 text-6xl text-center font-fancy">
                    Exquisite Corpse
                  </h1>
                  <button
                    onClick={() => setStatus({ ...status, view: "new" })}
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    <Marker />
                    Start a new story
                  </button>
                  <button
                    onClick={() =>
                      setOptions({
                        ...options,
                        gameStatus: "playing",
                        showGroup: true,
                        title: "My stories...",
                      })
                    }
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    <Marker />
                    My stories
                  </button>
                  <button
                    onClick={() =>
                      setOptions({
                        ...options,
                        gameStatus: "new",
                        showGroup: true,
                        title: "Join...",
                      })
                    }
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    <Marker />
                    Join story
                  </button>
                  <button
                    onClick={() =>
                      setOptions({
                        ...options,
                        gameStatus: "closed",
                        showGroup: true,
                        title: "Library",
                      })
                    }
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    <Marker />
                    Library
                  </button>
                  <button
                    onClick={() => setStatus({ ...status, view: "tutorial" })}
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    <Marker />
                    How to play
                  </button>
                </div>
              ) : options.gameStatus !== "playing" ? (
                <>
                  <StatusGroup
                    games={status.games}
                    gameStatus={options.gameStatus}
                    title={options.title}
                  />
                  <button
                    onClick={() => {
                      setOptions({ ...options, showGroup: false });
                      setStatus({ ...status, currentViewedGame: undefined });
                    }}
                    className="btn-simple btn-style"
                  >
                    Go back
                  </button>
                </>
              ) : (
                <>
                  <GamesFiltered status={status} />
                  <button
                    onClick={() => {
                      setOptions({
                        ...options,
                        showGroup: false,
                        gameStatus: "closed",
                      });
                      setStatus({ ...status, currentViewedGame: undefined });
                    }}
                    className="btn-simple btn-style"
                  >
                    Go back
                  </button>
                </>
              )}
            </>
          )
        }
      </AppCtx.Consumer>
    </div>
  );
};

export default GameList;
