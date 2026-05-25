import Gameboard from "./src/gameboard";

export default class Player{
    constructor(type) {
        this.playerType = type;
        this.board = new Gameboard()
    }

    
}