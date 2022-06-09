import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import NewGame from "./components/GameNew";
import GameList from "./components/GameList";
import GameTutorial from "./components/GameTutorial";
import AppCtx from "./context/AppContext";
import { processUpdate } from "./lib/processUpdate";
import { Back } from "./components/icons";
import "@fontsource/unifrakturmaguntia";
import "@fontsource/grenze-gotisch";
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

  window.webxdc.setUpdateListener((update) =>
    processUpdate(update, status, setStatus)
  );

  useEffect(() => {
    setStatus(status);
  }, [
    status.games.map((game) => game.turnID),
    status.games.map((game) => game.gameStatus),
  ]);

  return (
    <AppCtx.Provider value={value}>
      <div
        id="parchment"
        className="flex flex-col items-center justify-center min-h-[100vh] w-full"
      >
        {status.view === "tutorial" && <GameTutorial />}
        {status.view === "new" && <NewGame />}
        {status.view === "list" ? (
          <>
            <GameList />
          </>
        ) : (
          <button
            onClick={() => setStatus({ ...status, view: "list" })}
            className="p-1 pr-2 rounded-lg btn-style back"
          >
            {/* Go back */}
            <Back />
          </button>
        )}
        <p className="mt-auto mb-4 font-mono text-xs font-thin">
          &copy;{year}{" "}
          <a href="https://github.com/DeltaZen" className="text-red-900">
            DeltaZen
          </a>
        </p>
      </div>
    </AppCtx.Provider>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!);
root.render(<App />);
