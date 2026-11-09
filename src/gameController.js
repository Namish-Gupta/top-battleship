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

        this.boardOne.placeShip(new Ship(2), 0, 0, false);
        this.boardTwo.placeShip(new Ship(2), 0, 0, false);
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