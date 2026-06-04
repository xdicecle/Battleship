//Modal Imports
const modalLoseEl = document.getElementById("gameOverLoseModal");
const loseModal = new bootstrap.Modal(modalLoseEl);
const modalWinEl = document.getElementById("gameOverWinModal");
const winModal = new bootstrap.Modal(modalWinEl);

// UI target for attack accuracy text
const accuracyDisplay = document.querySelector("#attackAccuracy");

// Builds a 10x10 grid of clickable squares for a board
export function createGameBoard(board, gameBoard, onPlayerTurnComplete, player) {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const inputBox = document.createElement("button");
      inputBox.className = "square";

      // Subtle hover scale to show focus
      inputBox.addEventListener("mouseover", (e) => {
        e.target.style.scale = 1.1;
      });
      inputBox.addEventListener("mouseout", (e) => {
        e.target.style.scale = 1;
      });

      // Store grid coordinates on the element
      inputBox.dataset.x = x;
      inputBox.dataset.y = y;

      // Click handler reads coords and forwards to game logic
      const click = (e) => {
        const x = Number(e.currentTarget.dataset.x);
        const y = Number(e.currentTarget.dataset.y);

        console.log(squareCLicked(y, x, board, gameBoard));

        setTimeout(() => {
          console.log(onPlayerTurnComplete()
          )
        }, 300);

        if (gameBoard.checkShips()) {
          if (player === "player")
            displayGameResults(true, winModal, loseModal);
          else if(player === "computer") {
            displayGameResults(false, winModal, loseModal);
          }
        }
      };

      // Only allow one click per square
      inputBox.addEventListener("click", click, { once: true });

      board.appendChild(inputBox);
    }
  }
}

// Paints a placed ship on the UI board
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

// Places a ship in the model and mirrors it on the UI
export function placeShip(posY, posX, length, orientation, board, gameBoard) {
  if (!gameBoard.placeShip(posY, posX, length, orientation)) return false;

  displayShip(posY, posX, length, orientation, board);
}

// Handles a click on a square and updates UI + accuracy
export function squareCLicked(y, x, board, gameBoard) {
  const box = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  const result = gameBoard.receiveAttack(y, x);

  displayAccuracy(result);

  if (result == "Miss") {
    box.style.backgroundColor = "black";
  }
  else if (result == "Hit") {
    box.style.backgroundColor = "blue";
  }

  return result;
}

// Writes attack accuracy text to the UI
function displayAccuracy(str) {
  accuracyDisplay.textContent = str;
}

export function displayGameResults(result, winModal, loseModal) {
  if (result) winModal.show();
  else if (!result) loseModal.show();
}
