import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import GameView from "./GameView";

const StatusGroup: React.FC<StatusGroupI> = ({ status, gameStatus, title }) => {
  return status.games.filter((game) => game.gameStatus === gameStatus).length >
    0 ? (
    <>
      <h3>{title}</h3>
      <ul className="container flex flex-row flex-wrap items-center justify-center w-full">
        {status.games
          .filter((game) => game.gameStatus === gameStatus)
          .map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })}
      </ul>
    </>
  ) : null;
};

const GameList = () => {
  //const ctx = React.useContext(AppCtx);
  return (
    <AppCtx.Consumer>
      {({ status, setStatus }) =>
        status.currentViewedGame ? (
          <>
            <GameView game={status.currentViewedGame} />
            <button
              onClick={() =>
                setStatus({ ...status, currentViewedGame: undefined })
              }
              className="px-4 mb-2 border border-primario rounded-xl"
            >
              Go back
            </button>
            {/* <button
              onClick={() =>
                setStatus({
                  ...status,
                  currentViewedGame: status.currentPlayingGame,
                })
              }
              className="px-4 mb-2 border border-primario rounded-xl"
            >
              Refresh
            </button> */}
          </>
        ) : (
          <>
            <h2>List of games</h2>
            <StatusGroup status={status} gameStatus="new" title="Available" />
            <StatusGroup
              status={status}
              gameStatus="playing"
              title="In progress"
            />
            <StatusGroup status={status} gameStatus="closed" title="Closed" />
            <button
              onClick={() => setStatus({ ...status, view: "new" })}
              className="px-4 border border-primario rounded-xl"
            >
              Create new game
            </button>
          </>
        )
      }
    </AppCtx.Consumer>
  );
};

export default GameList;
