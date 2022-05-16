import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";

const StatusGroup: React.FC<StatusGroupI> = ({ status, gameStatus, title }) => {
  return status.games.filter((game) => game.gameStatus === gameStatus).length >
    0 ? (
    <div className="wrap">
      <h3 className="font-bold text-2xl">{title}</h3>
      <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
        {status.games
          .filter((game) => game.gameStatus === gameStatus)
          .map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })}
      </ul>
    </div>
  ) : (
    <div className="wrap">
      <h3 className="font-bold text-2xl">{title}</h3>
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
  //const ctx = React.useContext(AppCtx);
  return (
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
              className="btn-simple"
            >
              Go back
            </button>
          </>
        ) : (
          <>
            {!options.showGroup ? (
              <div className="wrap">
                <button
                  onClick={() => setStatus({ ...status, view: "new" })}
                  className="btn"
                >
                  Start a new story
                </button>
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      gameStatus: "playing",
                      showGroup: true,
                      title: "Continue...",
                    })
                  }
                  className="btn"
                >
                  Continue story
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
                  className="btn"
                >
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
                  className="btn"
                >
                  Library
                </button>
                <button
                  onClick={() => setStatus({ ...status, view: "tutorial" })}
                  className="btn"
                >
                  How to play
                </button>
              </div>
            ) : (
              <>
                <StatusGroup
                  status={status}
                  gameStatus={options.gameStatus}
                  title={options.title}
                />
                <button
                  onClick={() => {
                    setOptions({ ...options, showGroup: false });
                    setStatus({ ...status, currentViewedGame: undefined });
                  }}
                  className="btn-simple"
                >
                  Go back
                </button>
              </>
            )}
          </>
        )
      }
    </AppCtx.Consumer>
  );
};

export default GameList;
