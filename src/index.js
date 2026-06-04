// Imports
import Gameboard from "./gameboard";
import Player from "../player";
import "./style.css";
import { createGameBoard, placeShip, squareCLicked } from "../ui";

// Initialize UI nodes and game state
const playerBoard = document.getElementById("gameboardPlayer");
const computerBoard = document.getElementById("gameboardComputer");
const randomizeButtons = document.querySelectorAll(".randomizeBoardsButton");
const accuracyDisplay = document.getElementById("attackAccuracy");
const playerGameBoard = new Gameboard();
const computerGameBoard = new Gameboard();
const computer = new Player("computer");
const shipLengths = [4, 3, 2, 2];

//function for computer attacks
function computerAttack() {
  computer.attack(squareCLicked, playerBoard, playerGameBoard);
  return true;
}
function playerAttack() {}

function resetComputerTracking() {
  computer.cords.clear();
  computer.hit = false;
}

function rebuildBoards() {
  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";
  createGameBoard(playerBoard, playerGameBoard, playerAttack, "computer");
  createGameBoard(computerBoard, computerGameBoard, computerAttack, "player");
}

function randomOrientation() {
  return Math.random() < 0.5 ? "horizontal" : "vertical";
}

function placeShipsRandomly(gameBoard, board, shouldDisplay) {
  const maxAttempts = 100;

  for (let i = 0; i < shipLengths.length; i++) {
    const length = shipLengths[i];
    let placed = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const y = Math.floor(Math.random() * 10);
      const x = Math.floor(Math.random() * 10);
      const orientation = randomOrientation();

      if (shouldDisplay) {
        if (placeShip(y, x, length, orientation, board, gameBoard)) {
          placed = true;
          break;
        }
      } else if (gameBoard.placeShip(y, x, length, orientation)) {
        placed = true;
        break;
      }
    }

    if (!placed) return false;
  }

  return true;
}

function randomizeBoards() {
  const maxRuns = 20;

  for (let run = 0; run < maxRuns; run++) {
    playerGameBoard.createBoard();
    computerGameBoard.createBoard();
    resetComputerTracking();
    rebuildBoards();

    const playerPlaced = placeShipsRandomly(playerGameBoard, playerBoard, true);
    const computerPlaced = placeShipsRandomly(
      computerGameBoard,
      computerBoard,
      false,
    );

    if (playerPlaced && computerPlaced) {
      if (accuracyDisplay) accuracyDisplay.textContent = "";
      return true;
    }
  }

  console.warn("Failed to randomize boards after multiple attempts.");
  return false;
}

randomizeButtons.forEach((button) => {
  button.addEventListener("click", randomizeBoards);
});

randomizeBoards();
