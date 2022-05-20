import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
// import { ReceivedStatusUpdate } from "../webxdc";
import NewGame from "./components/GameNew";
import GameList from "./components/GameList";
import GameTutorial from "./components/GameTutorial";
import AppCtx from "./context/AppContext";
import { processUpdate } from "./lib/processUpdate";
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

  // useEffect(() => {
  //   console.log("useEffect called");
  window.webxdc.setUpdateListener((update) =>
    processUpdate(update, status, setStatus)
  );
  // });

  return (
    <AppCtx.Provider value={value}>
      <div
        id="parchment"
        className="flex flex-col items-center justify-center min-h-[100vh] w-full"
      >
        <h1 className="my-8 text-4xl font-fancy">Exquisite Corpse</h1>
        {status.view === "tutorial" && <GameTutorial />}
        {status.view === "new" && <NewGame />}
        {status.view === "list" ? (
          <>
            {/* {status.games.length > 0 ? <GameList /> : <p>No hay nada aquí</p>} */}
            <GameList />
          </>
        ) : (
          <button
            onClick={() => setStatus({ ...status, view: "list" })}
            className="btn-simple"
          >
            Go back
          </button>
        )}
        <p className="mt-auto mb-4 font-mono text-xs font-thin">
          &copy;{year} Massick
        </p>
      </div>
    </AppCtx.Provider>
  );
};

const domContainer = document.getElementById("react-code");
const root = createRoot(domContainer!); // createRoot(container!) if you use TypeScript
root.render(<App />);
