import { ReceivedStatusUpdate } from "../../webxdc";

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
  currentGame?: Corpse;
  view: "new" | "list";
  games: Corpse[];
}

interface ExquisiteContext {
  ctxProps: IndexProps;
  setCtxProps: React.Dispatch<React.SetStateAction<IndexProps>>;
}

export const processUpdate = (
  update: ReceivedStatusUpdate<Corpse>,
  status: IndexProps,
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
) => {
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
      // check for player list
      console.log(status.games[index].players, payload.players);
      if (currentGame.players.length < payload.players.length) {
        console.log("new player joined");
        status.games[index].players = payload.players;
      }
      // check for game status
      if (currentGame.gameStatus !== payload.gameStatus) {
        console.log("game status changed");
        status.games[index].gameStatus = payload.gameStatus;
      }
      if (currentGame.turnID < payload.turnID) {
        console.log(
          "new turn\n",
          status.games[index].currentPlayer.address,
          "\nvs\n",
          payload.currentPlayer.address
        );
        status.games[index] = payload;
      }
    }
  }
  console.log("\nprocessing update\n");
};
