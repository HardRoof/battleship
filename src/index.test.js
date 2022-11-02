import { shipFactory, GameBoardFactory, player } from "../src/index";

let board;
beforeEach(() => {
  board = GameBoardFactory();
  board.init();
});

test("Creating a ship", () => {
  expect(shipFactory(1)).toEqual({
    length: 1,
    timeHit: 0,
    sank: false,
    hit: expect.any(Function),
    hasSunk: expect.any(Function),
  });
});

test("Hitting a ship", () => {
  let myShip = shipFactory(1);
  myShip.hit();
  expect(myShip).toEqual({
    length: 1,
    timeHit: 1,
    sank: true,
    hit: expect.any(Function),
    hasSunk: expect.any(Function),
  });
});

test("Placing a ship in the GameBoard", () => {
  board.placeShips(0, 5, 5, "parallel");
  expect(board.placeShips(0, 5, 5, "parallel")).toBeTruthy();
});

test("Placing a ship out of bounds", () => {
  board.placeShips(0, 5, 6, "parallel");
  expect(board.placeShips(0, 5, 6, "parallel")).toEqual("Out of Bounds");
});

test("Have all boats sunk", () => {
  const carrier = board.placeShips(0, 5, 2, "parallel", "carrier");
  board.receiveAttack(0, 5, carrier);
  board.receiveAttack(0, 6, carrier);
  expect(board.checkIfSunk()).toBeTruthy();
});

// carrier = 5
// battleship = 4
// destroyer = 3
// submarine = 3
// patrol-boat = 2
