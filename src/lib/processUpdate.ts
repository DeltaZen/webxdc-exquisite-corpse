import { ReceivedStatusUpdate } from "../../webxdc";

export const processUpdate = (
  update: ReceivedStatusUpdate<Corpse>,
  status: IndexProps,
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
) => {
  const payload = update.payload;
  if (status.games) {
    const gameList = status.games.map((game) => game.sessionName);
    if (
      payload.gameStatus === "new" &&
      !gameList.includes(payload.sessionName)
    ) {
      const games = [...status.games, payload];
      setStatus({ ...status, games: games });
      console.log("new game added: ", status.games.length, games.length);
    } else if (gameList.includes(payload.sessionName)) {
      const index = status.games.findIndex(
        (game) => game.sessionName === payload.sessionName
      );
      const oldGame = status.games[index];
      if (oldGame.players.length < payload.players.length) {
        console.log("new player joined");
        status.games[index].players = payload.players;
      }
      if (oldGame.gameStatus !== payload.gameStatus) {
        console.log("game status changed");
        status.games[index].gameStatus = payload.gameStatus;
      }
      if (oldGame.turnID < payload.turnID) {
        console.log(
          "new turn",
          oldGame.turnID,
          payload.turnID,
          oldGame.currentPlayer.address,
          payload.currentPlayer.address
        );
        status.games[index] = payload;
      }
    }
  }
};
