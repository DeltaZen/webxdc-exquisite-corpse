import React from "react";
import AppCtx from "../context/AppContext";
import GameButton from "./GameButton";
import { Back } from "./icons";
import GameView from "./GameView";

const GamesFiltered: React.FC<{ status: IndexProps }> = ({ status }) => {
  const myGames = status.games.filter((game) =>
    game.players.some((player) => player.address === status.playerAddr)
  );
  return (
    <div>
      <StatusGroup games={myGames} gameStatus={"new"} title={"Waiting"} />

      <StatusGroup games={myGames} gameStatus={"playing"} title={"Playing"} />

      <StatusGroup games={myGames} gameStatus={"closed"} title={"Finished"} />
    </div>
  );
};

const StatusGroup: React.FC<StatusGroupI> = ({
  games,
  gameStatus,
  title,
  addr,
}) => {
  //const playerList = game.players.map((player) => player.address);
  const gameList = games.filter((game) => game.gameStatus === gameStatus);
  return gameList.length > 0 ? (
    <div className="w-full wrap">
      <h3 className="my-4 text-4xl font-bold fl">{title}</h3>
      <ul className="relative grid w-full grid-flow-row grid-cols-2 md:grid-cols-3">
        {!addr ? (
          gameList.reverse().map((game) => {
            return <GameButton key={game.sessionName} game={game} />;
          })
        ) : gameList.filter(
            (game) =>
              !game.players.map((player) => player.address).includes(addr)
          ).length > 0 ? (
          gameList.reverse().map((game) => {
            if (gameStatus === "new") {
              const playerList = game.players.map((player) => player.address);
              return !playerList.includes(addr) ? (
                <GameButton key={game.sessionName} game={game} />
              ) : null;
            } else {
              return <GameButton key={game.sessionName} game={game} />;
            }
          })
        ) : (
          <p className="absolute mx-auto text-center translate-x-1/2">
            Sorry, no game found
          </p>
        )}
      </ul>
    </div>
  ) : (
    <div className="my-4 wrap">
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
                className="p-1 pr-2 rounded-lg btn-style back"
              >
                <Back />
                {/* Go back */}
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
                    Library
                  </button>
                  <button
                    onClick={() => setStatus({ ...status, view: "tutorial" })}
                    className="max-w-2xl btn w-[80vw] relative btn-style"
                  >
                    How to play
                  </button>
                </div>
              ) : options.gameStatus !== "playing" ? (
                <>
                  <StatusGroup
                    games={status.games}
                    gameStatus={options.gameStatus}
                    title={options.title}
                    addr={status.playerAddr}
                  />
                  <button
                    onClick={() => {
                      setOptions({ ...options, showGroup: false });
                      setStatus({ ...status, currentViewedGame: undefined });
                    }}
                    className="p-1 pr-2 rounded-lg btn-style back"
                  >
                    <Back />
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
                    className="p-1 pr-2 rounded-lg btn-style back"
                  >
                    <Back />
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
