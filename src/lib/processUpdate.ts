import { ReceivedStatusUpdate } from "../../webxdc";

export const processUpdate = (
  update: ReceivedStatusUpdate<Corpse>,
  status: IndexProps,
  setStatus: React.Dispatch<React.SetStateAction<IndexProps>>
) => {
  console.log("processing update");
  const payload = update.payload;
  if (status.games) {
    const gameList = status.games.map((game) => game.sessionName);
    // new game that is not in the list
    if (
      payload.gameStatus === "new" &&
      !gameList.includes(payload.sessionName)
    ) {
      const games = [...status.games, payload];
      setStatus({ ...status, games: games });
      console.log("new game added");
    } else if (gameList.includes(payload.sessionName)) {
      // handle game update
      const index = status.games.findIndex(
        (game) => game.sessionName === payload.sessionName
      );
      const oldGame = status.games[index];
      // check for player list
      // console.log(status.games[index].players, payload.players);
      if (oldGame.players.length < payload.players.length) {
        console.log("new player joined");
        status.games[index].players = payload.players;
      }
      // check for game status

      // if (oldGame.gameStatus !== payload.gameStatus) {
      //   console.log("game status changed");
      //   status.games[index].gameStatus = payload.gameStatus;
      // }

      if (oldGame.turnID < payload.turnID) {
        console.log("new turn", oldGame.turnID, payload.turnID);
        status.games[index] = payload;
        // const test = Object.keys(payload).map(k=>`${status.games[index][k]} - ${payload[k]}`)
        // console.log(test)
      }
    }    
  }
};
