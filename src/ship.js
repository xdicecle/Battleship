export default class Ship{
    constructor(length, orientation) {
        this.length = length;
        this.orientation = orientation;
        this.hits = 0;
        this.sunk = this.isSunk();
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        if (this.hits >= this.length) return true;
        else return false;
    }
}
