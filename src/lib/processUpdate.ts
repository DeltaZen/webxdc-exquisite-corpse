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
      const games = [payload, ...status.games];
      setStatus({ ...status, games: games });
    } else if (gameList.includes(payload.sessionName)) {
      const index = status.games.findIndex(
        (game) => game.sessionName === payload.sessionName
      );
      const oldGame = status.games[index];
      if (oldGame.players.length < payload.players.length) {
        status.games[index].players = payload.players;
      }
      if (oldGame.gameStatus !== payload.gameStatus) {
        status.games[index].gameStatus = payload.gameStatus;
      }
      if (oldGame.turnID < payload.turnID) {
        status.games[index] = payload;
      }
    }
  }
};
