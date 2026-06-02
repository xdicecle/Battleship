import Gameboard from "./src/gameboard";

// Represents a human or computer player
export default class Player{
    constructor(type) {
        this.playerType = type;
        this.cords = new Set();
    }
    
    // Chooses a random target and delegates to the provided attack function
    attack(attackFunction, board, gameBoard) {
        let y = 0;
        let x = 0;

        do {
            y = Math.floor(Math.random() * 10);
            x = Math.floor(Math.random() * 10);
        }
        while (this.cords.has(this.#key(y, x))); 
        
        this.cords.add(this.#key(y,x));
        attackFunction(y, x, board, gameBoard);
    }

    #key(y, x) {
        return `${y},${x}`;
    }
    
}