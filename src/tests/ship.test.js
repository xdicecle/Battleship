import Ship from "../ship.js";

describe('check if ship has sunk', () => {
    const ship = new Ship(3);
    test('length of 3', () => {
        expect(ship.length).toBe(3);
    });
    ship.hit();
    ship.hit();
    ship.hit();
    test('has sunk', () => {
        expect(ship.isSunk()).toBe(true);
    });
});