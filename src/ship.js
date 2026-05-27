export default class Ship{
    constructor(length, orientation) {
        this.length = length;
        this.orientation = orientation;
        this.hits = 0;
        this.sunk = this.isSunk();
    }

    //increases the hit variable
    hit() {
        this.hits += 1;
    }

    //Checks if the ship has been hit as many times or more than its length
    isSunk() {
        if (this.hits >= this.length) return true;
        else return false;
    }
}
