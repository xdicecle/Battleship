import Ship from "./ship.js";

export default class Gameboard{
    constructor() {
        this.board = [];
    }

    createBoard() {
        this.board = Array.from({length: 10}, () => Array(10).fill(null));
    }

    isInBounds(posY, posX) {
        return posY >= 0 && posY < 10 && posX >= 0 && posX < 10;
    }

    canPlaceShip(posY, posX, length, orientation) {
        for (let i = 0; i < length; i++){
            let y = posY;
            let x = posX;

            if (orientation === "horizontal") x = posX + i;
            if (orientation === "vertical") y = posY + i;

            if (!this.isInBounds(y, x)) return false;
            if (this.board[y][x] !== null) return false;
        }

        return true;
    }

    placeShip(posY, posX, length, orientation) {
        if (!this.canPlaceShip(posY, posX, length, orientation)) return false;

        let ship = new Ship(length, orientation);

        if (orientation === "horizontal") {
            for (let i = 0; i < length; i++){
                this.board[posY][posX + i] = ship; 
            }
        }

        if (orientation === "vertical") {
            for (let i = 0; i < length; i++){
                this.board[posY + i][posX] = ship; 
            }
        }

        return true;
    }

    receiveAttack(posY, posX) {
        if (!this.isInBounds(posY, posX)) return "miss";

        const target = this.board[posY][posX];

        if (target instanceof Ship) {
            target.hit();
            return "hit";
        }

        this.board[posY][posX] = "miss";
        return "miss";
    }

    checkShips() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {

                let target = this.board[i][j];
                if (target instanceof Ship) {
                    if (!target.isSunk()) return false;
                }
            }
        }
        return true;
    }
}