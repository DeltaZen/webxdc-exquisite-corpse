import React from "react";

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

const defaultIndexProps = {
  playerName: playerName,
  playerAddr: playerAddr,
  view: "list" as "list",
  games: [],
};

interface ExquisiteContext {
  status: IndexProps;
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>;
}

const AppCtx = React.createContext<ExquisiteContext>({
  status: defaultIndexProps,
  setStatus: () => {},
});

export default AppCtx;
