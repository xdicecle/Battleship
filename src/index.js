import Ship from "./ship";
import "./style.css";
import { createGameBoard } from "../ui";

const playerBoard = document.getElementById("gameboardPlayer");
const computerBoard = document.getElementById("gameboardComputer");

createGameBoard(playerBoard);
createGameBoard(computerBoard);