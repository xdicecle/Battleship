//Imports
import Ship from "./ship";
import Gameboard from "./gameboard";
import "./style.css";
import { createGameBoard, placeShip } from "../ui";

//Initialize variables
const playerBoard = document.getElementById("gameboardPlayer");
const computerBoard = document.getElementById("gameboardComputer");
const playerGameBoard = new Gameboard();
const computerGameBoard = new Gameboard();

// Create and display game boards
createGameBoard(playerBoard);
createGameBoard(computerBoard);

// Initialize boards
playerGameBoard.createBoard();
computerGameBoard.createBoard();

// Place ships on player's board
placeShip(0, 0, 4, "horizontal", playerBoard, playerGameBoard); // Battleship
placeShip(2, 0, 3, "horizontal", playerBoard, playerGameBoard); // Cruiser
placeShip(4, 0, 2, "vertical", playerBoard, playerGameBoard); // Destroyer
placeShip(6, 0, 2, "horizontal", playerBoard, playerGameBoard); // Submarine

// Place ships on computer's board
placeShip(1, 1, 4, "vertical", computerBoard, computerGameBoard); // Battleship
placeShip(1, 3, 3, "horizontal", computerBoard, computerGameBoard); // Cruiser
placeShip(4, 2, 2, "vertical", computerBoard, computerGameBoard); // Destroyer
placeShip(7, 5, 2, "horizontal", computerBoard, computerGameBoard); // Submarine
