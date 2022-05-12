import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
// import { ReceivedStatusUpdate } from "../webxdc";
import NewGame from "./components/NewGame";
import GameList from "./components/GameList";
import AppCtx from "./context/AppContext";
import { processUpdate } from "./lib/processUpdate";
import "./input.css";

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

const App = () => {
  const year = new Date().getFullYear();

  const [status, setStatus] = useState<IndexProps>({
    playerName: playerName,
    playerAddr: playerAddr,
    view: "list",
    games: [],
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
