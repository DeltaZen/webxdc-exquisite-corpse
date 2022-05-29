import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";
import Marker from "./Marker";

const StatusGroup: React.FC<StatusGroupI> = ({ status, gameStatus, title }) => {
  return status.games.filter((game) => game.gameStatus === gameStatus).length >
    0 ? (
    <div className="w-full wrap">
      <h3 className="text-4xl font-bold fl">{title}</h3>
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
  //const ctx = React.useContext(AppCtx);
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
                className="btn-simple"
              >
                Go back
              </button>
            </>
          ) : (
            <>
              {!options.showGroup ? (
                <div className="wrap">
                  <h1 className="my-8 text-6xl text-center font-fancy">
                    Exquisite Corpse
                  </h1>
                  <button
                    onClick={() => setStatus({ ...status, view: "new" })}
                    className="max-w-2xl btn w-[80vw] relative"
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
                        title: "Continue...",
                      })
                    }
                    className="max-w-2xl btn w-[80vw] relative"
                  >
                    <Marker />
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
                    className="max-w-2xl btn w-[80vw] relative"
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
                    className="max-w-2xl btn w-[80vw] relative"
                  >
                    <Marker />
                    Library
                  </button>
                  <button
                    onClick={() => setStatus({ ...status, view: "tutorial" })}
                    className="max-w-2xl btn w-[80vw] relative"
                  >
                    <Marker />
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
    </div>
  );
};

export default GameList;
