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
  lookForDeletedPlayers?: boolean;
  date?: Date;
}

interface Player {
  name: string;
  address: string;
  deleted?: boolean;
}

interface IndexProps {
  id: number;
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
  games: Corpse[];
  gameStatus: "new" | "playing" | "closed";
  title: string;
  addr?: string;
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
