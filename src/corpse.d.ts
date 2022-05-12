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
  currentViewedGame?: Corpse;
  currentPlayingGame?: Corpse;
  view: "new" | "list";
  games: Corpse[];
}

interface ExquisiteContext {
  ctxProps: IndexProps;
  setCtxProps: React.Dispatch<React.SetStateAction<IndexProps>>;
}

interface StatusGroupI {
  status: IndexProps;
  gameStatus: "new" | "playing" | "closed";
  title: string;
}