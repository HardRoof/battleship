import shipFactory from "./shipFactory";

function gameBoardFactory() {
  const allTheBoats = {};
  return {
    init() {
      let boardArr = [];
      for (let i = 0; i < 10; i++) {
        boardArr[i] = [];
        for (let j = 0; j < 10; j++) {
          boardArr[i].push(false);
        }
      }
      this["board"] = boardArr;
    },

    placeShips(headY, headX, length, direction, boatType) {
      if (direction === "parallel" && headX + length < 11) {
        for (let i = 0; i < length; i++) {
          if (this.board[headY][headX + i] !== false) return -1;
        }
        for (let i = 0; i < length; i++) {
          this.board[headY][headX + i] = boatType;
        }
        boatType = shipFactory(length, boatType);
        this.allTheBoats[boatType.boatName] = boatType;
        return boatType;
      } else if (direction === "vertical" && headY + length < 11) {
        for (let i = 0; i < length; i++) {
          if (this.board[headY + i][headX] !== false) return -1;
        }
        for (let i = 0; i < length; i++) {
          this.board[headY + i][headX] = boatType;
        }
        boatType = shipFactory(length, boatType);
        this.allTheBoats[boatType.boatName] = boatType;
        return boatType;
      } else return "Out of Bounds";
    },

    receiveAttack(headY, headX, boatType) {
      console.log(this.board);
      if (this.board[headY][headX] === false) this.board[headY][headX] = true;
      else if (this.board[headY][headX] === true) return;
      else {
        boatType.hit();
        this.board[headY][headX] = true;
      }
    },

    checkIfSunk() {
      const haveAllSunk = Object.keys(this.allTheBoats).every((boat) => this.allTheBoats[boat].sank === true);
      return haveAllSunk === true ? true : false;
    },
    allTheBoats,
  };
}

export default gameBoardFactory;
