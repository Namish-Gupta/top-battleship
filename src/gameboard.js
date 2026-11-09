class Gameboard {
    constructor() {
        this.size = 10;
        this.grid = Array.from({length: this.size}, () => Array(this.size).fill(null));
        this.ships = [];
        this.attacks = new Map();
    }

    placeShip(ship, row, col, isVertical) {
        this.ships.push(ship);
        for(let i = 0; i < ship.length; i++) {
            if(isVertical) this.grid[row + i][col] = ship;
            else this.grid[row][col + i] = ship;
        }
    }

    receiveAttack(row, col) {
        const coordKey = `${row},${col}`;
        if (this.attacks.has(coordKey)) throw new Error('Coordinate already attacked');

        const targetCell = this.grid[row][col];

        if(targetCell !== null) {
            targetCell.hit();
            this.attacks.set(coordKey, 'hit');
        }
        else this.attacks.set(coordKey, 'miss');
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    getMissedAttacks() {
    const misses = [];
    for (const [key, value] of this.attacks.entries()) {
      if (value === 'miss') {
        // Convert the "row,col" string back into a [row, col] numeric array
        const [r, c] = key.split(',').map(Number);
        misses.push([r, c]);
      }
    }
    return misses;
  }
}

export default Gameboard;