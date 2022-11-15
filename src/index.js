import "./styles/style.css";
import shipFactory from "./modules/shipFactory";
import gameBoardFactory from "./modules/gameBoardFactory";
import players from "./modules/players";

const playButton = document.getElementsByClassName("homepage__btn")[0];

class DOM {
  constructor() {
    this.boundEventHandler = this.startGame.bind(this); // bind() to prevent loosing "this"
    playButton.addEventListener("click", this.boundEventHandler);
  }

  async startGame(e) {
    this.removeBtnListener();
    await this.removeFadeOut(e, 2000);
    this.openStrategyPage();
    this.createStrategyGameBoard();
  }

  removeBtnListener() {
    playButton.removeEventListener("click", this.boundEventHandler);
  }

  removeFadeOut(e, speed) {
    const element = e.target.parentNode;
    const seconds = speed / 1000;
    element.style.transition = "opacity " + seconds + "s ease";
    element.style.opacity = 0;
    //setTimeout() doesn't return a Promise, but we can wrap it in one
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(element.parentNode.removeChild(element));
      }, 1000);
    });
  }

  openStrategyPage() {
    this.showContent(0);
    const strategyPage = document.getElementsByClassName("strategyPage")[0];
    this.AddFadeIn(strategyPage, 1.5);
  }

  showContent(position) {
    const temp = document.getElementsByTagName("template")[position];
    const clone = temp.content.cloneNode(true);
    document.body.append(clone);
  }

  AddFadeIn(element, seconds) {
    element.style.transition = `opacity ${seconds}s ease`;
    //Since the transition and opacity are dynamically assigned, we delay the browser so it can apply the FadeIn effect
    setTimeout(() => (element.style.opacity = 0.92));
  }

  createStrategyGameBoard() {
    this.createSquares();
    let contenders = players();
    Object.defineProperties(this, {
      boatToPlace: {
        value: contenders.carrier,
        writable: true,
      },
      boatToPlaceDirection: {
        value: "horizontal",
        writable: true,
      },
    });
    this.selectBoats(this.boatToPlace, this.boatToPlaceDirection);
    const rotateButton = document.getElementsByClassName("strategyPage__rotateBtn")[0];
    rotateButton.addEventListener("click", (e) => {
      while (e.target.previousElementSibling.firstChild) {
        e.target.previousElementSibling.removeChild(e.target.previousElementSibling.firstChild);
      }
      this.createSquares();
      this.boatToPlaceDirection = this.boatToPlaceDirection == "horizontal" ? "vertical" : "horizontal";
      this.selectBoats(this.boatToPlace, this.boatToPlaceDirection);
    });
  }

  selectBoats(boat, direction) {
    this.placeBoatTitle(boat.boatName);
    const squares = document.querySelectorAll(".strategyPage__square");
    squares.forEach((element, index) => {
      element.addEventListener("mouseover", () => this.hoverBoat(boat.length, direction, index));
    });
    squares.forEach((element, index) => {
      element.addEventListener("mouseout", () => {
        this.hoverBoat(boat.length, direction, index, "#e1e1e1");
      });
    });
  }

  placeBoatTitle(boat) {
    const h1 = document.querySelector(".strategyPage__boatName");
    h1.textContent = `Place your ${boat}:`;
  }

  hoverBoat(boatLength, direction, index, color) {
    const squares = document.querySelectorAll(".strategyPage__square");
    const squaresArr = [];
    if (direction === "horizontal") {
      const nodeListToArr = Array.prototype.slice.call(squares);
      const chunks = this.spliceIntoChunks(nodeListToArr, 10);
      for (let i = 0; i < boatLength; i++) {
        squaresArr.push(squares[index + i]);
      }
      for (let i = 0; i < chunks.length; i++) {
        var withinBoundsH = squaresArr.every((el) => chunks[i].includes(el));
        if (withinBoundsH === true) break;
      }
      this.checkOutOfBounds(withinBoundsH, squaresArr, color);
    } else if (direction === "vertical") {
      for (let i = 0; i < boatLength * 10; i += 10) {
        squaresArr.push(squares[index + i]);
      }
      const withinBoundsV = squaresArr.every((squaresArr) => squaresArr);
      this.checkOutOfBounds(withinBoundsV, squaresArr, color);
    }
  }

  checkOutOfBounds(withinBounds, squaresArr, color) {
    if (color) {
      squaresArr.forEach((element) => {
        if (element) element.style.backgroundColor = color;
      });
    } else if (withinBounds) {
      squaresArr.forEach((element) => {
        element.style.backgroundColor = "#58acf9";
      });
    } else if (!withinBounds) {
      squaresArr[0].style.backgroundColor = "red";
      squaresArr[0].style.cursor = "not-allowed";
    }
  }

  createSquares() {
    const numberOfSquares = 100;
    for (let i = 0; i < numberOfSquares; i++) {
      const div = document.createElement("div");
      document.getElementsByClassName("strategyPage__gameBoard")[0].appendChild(div);
      div.classList.add("strategyPage__square");
    }
  }

  spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }
}

const test = new DOM();

export { shipFactory, gameBoardFactory, players };

let contenders = players();
contenders.attack(5, 8, players().submarineBot);
console.log(contenders);
console.log(contenders.carrier);
// carrier = 5
// battleship = 4
// destroyer = 3
// submarine = 3
// patrol-boat = 2
