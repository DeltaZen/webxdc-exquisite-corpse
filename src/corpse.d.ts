interface Corpse {
  sessionName: string;
  admin: Player;
  gameStatus: "new" | "playing" | "closed";
  players: Player[];
  currentPlayer: Player;
  rounds: number;
  words: number;
  spoilerWords: number;
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
  view: "new" | "list" | "tutorial";
  games: Corpse[];
}

interface ExquisiteContext {
  status: IndexProps;
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>;
}

interface StatusGroupI {
  status: IndexProps;
  gameStatus: "new" | "playing" | "closed";
  title: string;
}

interface InputError {
  sessionName?: string;
  rounds?: string;
  text?: string;
  players?: string;
}

interface GameGroup {
  showGroup: boolean;
  gameStatus: "new" | "playing" | "closed";
  title: string;
}
