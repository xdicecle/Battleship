import Gameboard from "./src/gameboard";

// Represents a human or computer player
export default class Player {
  constructor(type) {
    this.playerType = type;
    this.cords = new Set();
    this.hit = false;
  }

  // Chooses a random target and delegates to the provided attack function
  attack(attackFunction, board, gameBoard) {
    let y = 0;
    let x = 0;
    let limit = 4;
    if (!this.hit) {
      do {
        y = Math.floor(Math.random() * 10);
        x = Math.floor(Math.random() * 10);
      } while (this.cords.has(this.#key(y, x)));
    } else {
        do {
        let horizontalToVerticalCHance = Math.random();
        let chance = Math.random();
        const arr = [...this.cords];
          [y, x] = arr.at(-1).split(",").map(Number);
          if (horizontalToVerticalCHance < 0.5) {
            if (chance < 0.5) x++;
            else x--;
          } else {
            if (chance < 0.5) y++;
            else y--;
          }
            limit--;
        } while (((this.cords.has(this.#key(y, x)) || !this.isInBounds(y,x)) && limit > 0));
    }

    this.cords.add(this.#key(y, x));
    let result = attackFunction(y, x, board, gameBoard);
      
      if (result == "Hit") this.hit = true;
      else if (result == "Miss") this.hit = false;
  }

  #key(y, x) {
    return `${y},${x}`;
  }
    // Bounds check for a coordinate pair
  isInBounds(posY, posX) {
    return posY >= 0 && posY < 10 && posX >= 0 && posX < 10;
  }
}
