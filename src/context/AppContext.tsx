import React from "react";

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

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

interface IndexProps {
  playerName: string;
  playerAddr: string;
  currentGame?: Corpse;
  view: "new" | "list";
  games: Corpse[];
  toggleCurrentGame: (game: Corpse | undefined) => void;
}

const defaultIndexProps = {
  playerName: playerName,
  playerAddr: playerAddr,
  view: "list" as "list",
  games: [],
};

const AppCtx = React.createContext<IndexProps | null>(null);

export default AppCtx;
