import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ReceivedStatusUpdate } from "../webxdc";
import NewGame from "./components/NewGame";
import GameList from "./components/GameList";
import AppCtx from "./context/AppContext";
import "./input.css";

interface Corpse {
  sessionName: string;
  admin: Player;
  gameStatus: "new" | "playing" | "closed";
  players: Player[];
  currentPlayer: Player;
  rounds: number;
  currentRound: number;
  turnID: number; // unique ID for each turn
  corpse: string[];
  spoiler: string;
}

interface Player {
  name: string;
  address: string;
}

interface IndexProps {
  playerName: string;
  playerAddr: string;
  currentGame?: Corpse;
  view: "new" | "list";
  games: Corpse[];
  toggleCurrentGame: (game: Corpse | undefined) => void;
}

interface ExquisiteContext {
  ctxProps: IndexProps;
  setCtxProps: React.Dispatch<React.SetStateAction<IndexProps>>;
}

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

const processUpdate = (
  update: ReceivedStatusUpdate<Corpse>,
  status: IndexProps,
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
) => {
  const payload = update.payload;
  if (status.games) {
    const gameList = status.games.map((game) => game.sessionName);
    // new game that is not in the list
    if (
      payload.gameStatus === "new" &&
      !gameList.includes(payload.sessionName)
    ) {
      const games = [...status.games, payload];
      setStatus({ ...status, games });
    } else if (gameList.includes(payload.sessionName)) {
      // handle game update
      const index = status.games.findIndex(
        (game) => game.sessionName === payload.sessionName
      );
      const currentGame = status.games[index];
      // check for player list
      if (currentGame.players.length < payload.players.length) {
        console.log("new player joined");
        status.games[index].players = payload.players;
      }
      // check for game status
      if (currentGame.gameStatus !== payload.gameStatus) {
        console.log("game status changed");
        status.games[index].gameStatus = payload.gameStatus;
      }
      if (currentGame.turnID < payload.turnID) {
        console.log("new turn\n", status.games[index], "\nvs\n", payload);
        status.games[index] = payload;
      }
    }
  }
  console.log("\nprocessing update\n");
};

const App = () => {
  const year = new Date().getFullYear();

  const [status, setStatus] = useState<IndexProps>({
    playerName: playerName,
    playerAddr: playerAddr,
    view: "list",
    games: [],
    toggleCurrentGame: (game: Corpse | undefined) => {
      console.log("setting new state for current game");
      setStatus({ ...status, currentGame: game });
    },
  });

  const value = { status, setStatus };

  useEffect(() => {
    window.webxdc.setUpdateListener((update) =>
      processUpdate(update, status, setStatus)
    );
  }, [status]);

  return (
    <AppCtx.Provider value={value}>
      <div className="flex flex-col items-center justify-center h-[100vh] w-full">
        <h1 className="my-8 text-xl font-bold text-red-600">
          Exquisite Corpse
        </h1>
        {status.view === "list" ? (
          <>
            {status.games.length > 0 && <GameList />}
            <button
              onClick={() => setStatus({ ...status, view: "new" })}
              className="px-4 border border-primario rounded-xl"
            >
              Create new game
            </button>
          </>
        ) : (
          <button
            onClick={() => setStatus({ ...status, view: "list" })}
            className="px-4 border border-primario rounded-xl"
          >
            Go back
          </button>
        )}
        {status.view === "new" && <NewGame />}
        <p className="mt-auto mb-4">&copy;{year} Massick</p>
      </div>
    </AppCtx.Provider>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!); // createRoot(container!) if you use TypeScript
root.render(<App />);
