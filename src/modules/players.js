import gameBoardFactory from "./gameBoardFactory";

function players() {
  let playerOneBoard = gameBoardFactory();
  let playerTwoBoard = gameBoardFactory();
  playerOneBoard.init();
  playerTwoBoard.init();

  const carrier = playerOneBoard.placeShips(0, 5, 5, "parallel", "carrier");
  const battleship = playerOneBoard.placeShips(0, 5, 4, "parallel", "battleship");
  const destroyer = playerOneBoard.placeShips(0, 5, 3, "parallel", "destroyer");
  const submarine = playerOneBoard.placeShips(0, 5, 3, "parallel", "submarine");
  const patrolBoat = playerOneBoard.placeShips(0, 5, 2, "parallel", "patrolBoat");

  const carrierBot = playerTwoBoard.placeShips(0, 5, 5, "parallel", "carrier");
  const battleshipBot = playerTwoBoard.placeShips(0, 5, 4, "parallel", "battleship");
  const destroyerBot = playerTwoBoard.placeShips(0, 5, 3, "parallel", "destroyer");
  const submarineBot = playerTwoBoard.placeShips(5, 6, 3, "parallel", "submarine");
  const patrolBoatBot = playerTwoBoard.placeShips(0, 5, 2, "parallel", "patrolBoat");
  return {
    playerOneBoard,
    playerTwoBoard,
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat,
    carrierBot,
    battleshipBot,
    destroyerBot,
    submarineBot,
    patrolBoatBot,
    attack(headY, headX, attackedBoat) {
      playerTwoBoard.receiveAttack(headY, headX, attackedBoat);
    },
    botAttack(attackedBoat) {
      playerOneBoard.receiveAttack(headY, headX, attackedBoat);
    },
  };
}

export default players;
