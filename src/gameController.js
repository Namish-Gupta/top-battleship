import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

class GameController {
    constructor() {
        this.playerOne = new Player('real');
        this.playerTwo = new Player('computer');

        this.activePlayer = this.playerOne;

        this.boardOne = new Gameboard();
        this.boardTwo = new Gameboard();
    }

    initializeComputerFleet() {
		const fleet = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer

		fleet.forEach((length) => {
			let placed = false;
			while (!placed) {
				// Generate random coordinates and orientation
				const row = Math.floor(Math.random() * 10);
				const col = Math.floor(Math.random() * 10);
				const isVertical = Math.random() > 0.5;

				try {
					// If placeShip throws an error (bounds/overlap), the catch block handles it
					// If it succeeds, placed becomes true and we exit the while loop
					this.boardTwo.placeShip(new Ship(length), row, col, isVertical);
					placed = true;
				} catch (error) {
					// Silently catch the error and let the while loop try again
				}
			}
		});
	}

    getActivePlayer() {
        return this.activePlayer;
    }

    switchTurn() {
        this.activePlayer = (this.activePlayer === this.playerOne) ? this.playerTwo : this.playerOne;
    }

    playRound(row, col) {
        this.playerOne.attack(this.boardTwo, row, col);
        if(this.checkWinner()) return;
        this.switchTurn();

        this.playerTwo.randomAttack(this.boardOne);
        if(this.checkWinner()) return;
        this.switchTurn();
    }

    checkWinner() {
        if(this.boardOne.allShipsSunk()) return this.playerTwo;
        if(this.boardTwo.allShipsSunk()) return this.playerOne;
        return null;
    }
}

export default GameController;