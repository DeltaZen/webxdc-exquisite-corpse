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

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

const App = () => {
  const year = new Date().getFullYear();

  const [status, setStatus] = useState<IndexProps>({
    playerName: playerName,
    playerAddr: playerAddr,
    view: "list",
    games: [],
    toggleCurrentGame: (game: Corpse | undefined) => {
      setStatus({ ...status, currentGame: game });
    },
  });

  useEffect(() => {
    window.webxdc.setUpdateListener(receiveUpdate);
  });

  const receiveUpdate = (update: ReceivedStatusUpdate<Corpse>) => {
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
        if (currentGame.turnID < payload.turnID) {
          // do stuff
        }
      }
    }
  };

  return (
    <AppCtx.Provider value={status}>
      <div className="flex flex-col items-center justify-center h-[100vh] w-full">
        <h1 className="my-8 text-xl font-bold text-red-600">
          Exquisite Corpse
        </h1>
        {status.view === "list" ? (
          <>
            <GameList games={status.games} />
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
