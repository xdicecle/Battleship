// Models a ship's size and damage state
export default class Ship {
  constructor(length, orientation) {
    this.length = length;
    this.orientation = orientation;
    this.hits = 0;
    this.sunk = this.isSunk();
  }

  // Increments hit count for this ship
  hit() {
    this.hits += 1;
    return true;
  }

  // Returns true once hits meet or exceed ship length
  isSunk() {
    if (this.hits >= this.length) return true;
    else return false;
  }
}
