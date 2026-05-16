import Gameboard from "../gameboard.js";
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

describe('tests for the gameboard', () => {
    let gameBoard;

    beforeEach(() => {
        gameBoard = new Gameboard();
        gameBoard.createBoard();
    });

    test("check size of the outside array to be 10",() => {
        expect(gameBoard.board.length).toBe(10);
    });
    test("check size of the inside array to be 10",() => {
        expect(gameBoard.board[0].length).toBe(10);
    });

    test("placeShip fills all horizontal cells", () => {
        const placed = gameBoard.placeShip(0, 2, 4, "horizontal");
        const ship = gameBoard.board[0][2];

        expect(placed).toBe(true);
        expect(ship).not.toBeNull();
        expect(gameBoard.board[0][3]).toBe(ship);
        expect(gameBoard.board[0][4]).toBe(ship);
        expect(gameBoard.board[0][5]).toBe(ship);
    });

    test("placeShip blocks overlap", () => {
        gameBoard.placeShip(1, 1, 3, "vertical");
        const placed = gameBoard.placeShip(2, 1, 2, "horizontal");

        expect(placed).toBe(false);
    });

    test("placeShip blocks out-of-bounds", () => {
        const placed = gameBoard.placeShip(9, 8, 3, "horizontal");

        expect(placed).toBe(false);
    });

    test("receiveAttack registers a hit", () => {
        gameBoard.placeShip(3, 3, 2, "horizontal");
        const result = gameBoard.receiveAttack(3, 4);

        expect(result).toBe("hit");
    });

    test("receiveAttack marks a miss", () => {
        const result = gameBoard.receiveAttack(0, 0);

        expect(result).toBe("miss");
        expect(gameBoard.board[0][0]).toBe("miss");
    });

    test("checkShips returns false when a ship is still afloat", () => {
        gameBoard.placeShip(5, 5, 2, "vertical");

        expect(gameBoard.checkShips()).toBe(false);
    });

    test("checkShips returns true when all ships are sunk", () => {
        gameBoard.placeShip(2, 2, 2, "horizontal");
        gameBoard.receiveAttack(2, 2);
        gameBoard.receiveAttack(2, 3);

        expect(gameBoard.checkShips()).toBe(true);
    });
})