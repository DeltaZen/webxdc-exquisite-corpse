import React from "react";

const playerName = window.webxdc.selfName;
const playerAddr = window.webxdc.selfAddr;

const defaultIndexProps = {
  id: 1,
  playerName: playerName,
  playerAddr: playerAddr,
  view: "list" as "list",
  games: [],
};

const AppCtx = React.createContext<ExquisiteContext>({
  status: defaultIndexProps,
  setStatus: () => {},
});

export default AppCtx;
