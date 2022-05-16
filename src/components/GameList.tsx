import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";

const StatusGroup: React.FC<StatusGroupI> = ({ status, gameStatus, title }) => {
  return status.games.filter((game) => game.gameStatus === gameStatus).length >
    0 ? (
    <>
      <h3 className="font-bold text-lg">{title}</h3>
      <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
        {status.games
          .filter((game) => game.gameStatus === gameStatus)
          .map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })}
      </ul>
    </>
  ) : (
    <>
      <h3 className="font-bold text-lg">{title}</h3>
      <p>Sorry, no game found</p>
    </>
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
              className="px-4 mb-2 border border-primario rounded-xl"
            >
              Go back
            </button>
          </>
        ) : (
          <>
            {!options.showGroup ? (
              <>
                <button
                  onClick={() => setStatus({ ...status, view: "new" })}
                  className="px-4 my-2 border border-primario rounded-xl first-letter:font-fancy first-letter:text-xl"
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
                  className="px-4 my-2 border border-primario rounded-xl first-letter:font-fancy first-letter:text-xl"
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
                  className="px-4 my-2 border border-primario rounded-xl first-letter:font-fancy first-letter:text-xl"
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
                  className="px-4 my-2 border border-primario rounded-xl first-letter:font-fancy first-letter:text-xl"
                >
                  Library
                </button>
                <button
                  onClick={() => setStatus({ ...status, view: "tutorial" })}
                  className="px-4 my-2 border border-primario rounded-xl first-letter:font-fancy first-letter:text-xl"
                >
                  How to play
                </button>
              </>
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
                  className="px-4 mb-2 border border-primario rounded-xl"
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
