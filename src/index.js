// Imports
import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "../player";
import "./style.css";
import { createGameBoard, placeShip, squareCLicked } from "../ui";

// Initialize UI nodes and game state
const playerBoard = document.getElementById("gameboardPlayer");
const computerBoard = document.getElementById("gameboardComputer");
const playerGameBoard = new Gameboard();
const computerGameBoard = new Gameboard();
const computer = new Player("computer");

//function for computer attacks
function computerAttack() { computer.attack(squareCLicked, playerBoard, playerGameBoard) };

// Create and display game boards
createGameBoard(playerBoard, playerGameBoard, computerAttack);
createGameBoard(computerBoard, computerGameBoard);

// Initialize board grids
playerGameBoard.createBoard();
computerGameBoard.createBoard();

// Place ships on player's board
placeShip(0, 0, 4, "horizontal", playerBoard, playerGameBoard); // Battleship
placeShip(2, 0, 3, "horizontal", playerBoard, playerGameBoard); // Cruiser
placeShip(4, 0, 2, "vertical", playerBoard, playerGameBoard); // Destroyer
placeShip(6, 0, 2, "horizontal", playerBoard, playerGameBoard); // Submarine

// Place ships on computer's gameboard
computerGameBoard.placeShip(1, 1, 4, "vertical"); //battleship
computerGameBoard.placeShip(1, 3, 3, "horizontal"); // Cruiser
computerGameBoard.placeShip(1, 1, 4, "vertical"); // Destroyer
computerGameBoard.placeShip(7, 5, 2, "horizontal"); // Submarine

// Gameplay Loop
while (!playerGameBoard.checkShips() && !computerGameBoard.checkShips()) {
    
}