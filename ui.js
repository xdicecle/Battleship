//imports
import Gameboard from "./src/gameboard";
import Ship from "./src/ship";

// Adds 100 boxes to the gameboard containers
export function createGameBoard(board) {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const inputBox = document.createElement("button");
      inputBox.className = "square";

      // change button colors on hover
      inputBox.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "grey";
      });
      inputBox.addEventListener("mouseout", (e) => {
        e.target.style.backgroundColor = "";
      });

      // assign data attributes to identify boxes
      inputBox.dataset.x = x;
      inputBox.dataset.y = y;

      inputBox.addEventListener("click", (e) => {
        const x = Number(e.currentTarget.dataset.x);
        const y = Number(e.currentTarget.dataset.y);

        console.log("board position:", y, x);
      });

      board.appendChild(inputBox);
    }
  }
}

function displayShip(posY, posX, length, orientation, board) {
  if (orientation === "vertical") {
    for (let y = posY; y < posY + length; y++) {
      let box = board.querySelector(`[data-x="${posX}"][data-y="${y}"]`);
      box.style.backgroundColor = "purple";
    }
  } else if (orientation === "horizontal") {
    for (let x = posX; x < posX + length; x++) {
      let box = board.querySelector(`[data-x="${x}"][data-y="${posY}"]`);
      box.style.backgroundColor = "purple";
    }
  }
}

export function placeShip(posY, posX, length, orientation, board, gameBoard) {
  if (!gameBoard.placeShip(posY, posX, length, orientation)) return false;

  displayShip(posY, posX, length, orientation, board);
}
