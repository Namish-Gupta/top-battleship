import GameController from '../src/gameController';
import Ship from '../src/ship';

describe('GameController Class', () => {
	let game;

	beforeEach(() => {
		// Instantiate a fresh game for each test
		game = new GameController();

		game.boardOne.placeShip(new Ship(3), 2, 2, false);
		game.boardTwo.placeShip(new Ship(2), 0, 0, false);
	});

	test('initializes with a real player and a computer player', () => {
		expect(game.playerOne.type).toBe('real');
		expect(game.playerTwo.type).toBe('computer');
	});

	test('active player starts as playerOne', () => {
		expect(game.getActivePlayer()).toBe(game.playerOne);
	});

	test('switchTurn toggles the active player', () => {
		game.switchTurn();
		expect(game.getActivePlayer()).toBe(game.playerTwo);
		game.switchTurn();
		expect(game.getActivePlayer()).toBe(game.playerOne);
	});

	test('playRound executes a turn for the human and then the computer', () => {
		// Human attacks [0, 0] on the computer's board
		game.playRound(0, 0);

		// The computer's board should register the human's attack
		expect(game.boardTwo.attacks.has('0,0')).toBe(true);

		// The computer should have immediately fired back at the human's board
		expect(game.boardOne.attacks.size).toBe(1);

		// It should be playerOne's turn again after the computer finishes
		expect(game.getActivePlayer()).toBe(game.playerOne);
	});

	test('checkWinner returns the winning player or null', () => {
		// Initially, no one has won
		expect(game.checkWinner()).toBeNull();
		
		// We manually sink all ships on the computer's board to simulate a win
		// (Assuming we hardcoded a length-2 ship at 0,0 in the constructor for testing)
		game.boardTwo.receiveAttack(0, 0);
		game.boardTwo.receiveAttack(0, 1);
		
		expect(game.checkWinner()).toBe(game.playerOne);
	});

	test('initializeComputerFleet randomly places 5 valid ships', () => {
		const freshGame = new GameController();
		freshGame.initializeComputerFleet();
		
		// A fleet of 5,4,3,3,2 means exactly 17 cells should be occupied by ships
		expect(freshGame.boardTwo.ships.length).toBe(5);
		let occupiedCells = 0;
		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 10; col++) {
				if (freshGame.boardTwo.grid[row][col] !== null) {
					occupiedCells++;
				}
			}
		}
		expect(occupiedCells).toBe(17);
	});
});