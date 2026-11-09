import Ship from './ship';

export default class SetupController {
	constructor(game, domController) {
		this.game = game;
		this.dom = domController;
		this.isVertical = false;
		this.shipsPlaced = 0;
		this.draggedShipLength = null;
		this.draggedShipElement = null;

		// DOM Elements
		this.setupBoard = document.getElementById('setup-board');
		this.rotateBtn = document.getElementById('rotate-btn');
		this.startBtn = document.getElementById('start-game-btn');
		this.shipyard = document.getElementById('shipyard');
		this.ships = document.querySelectorAll('.draggable-ship');

		this.initEventListeners();
		this.renderSetupBoard();
	}

	initEventListeners() {
		this.rotateBtn.addEventListener('click', () => {
			this.isVertical = !this.isVertical;
			this.rotateBtn.textContent = `Axis: ${this.isVertical ? 'Vertical' : 'Horizontal'}`;
		});

		this.startBtn.addEventListener('click', () => {
			document.getElementById('setup-container').classList.add('hidden');
			document.getElementById('game-container').classList.remove('hidden');
			document.getElementById('game-container').classList.add('active');
			
			// Randomly place computer ships and start game UI
			this.game.initializeComputerFleet();
			this.dom.renderBoards();
			document.getElementById('message-display').textContent = 'Attack the enemy waters!';
		});

		this.ships.forEach(ship => {
			ship.addEventListener('dragstart', (e) => {
				this.draggedShipLength = parseInt(e.target.dataset.length, 10);
				this.draggedShipElement = e.target;
			});
		});
	}

	renderSetupBoard() {
		this.setupBoard.innerHTML = '';
		const boardState = this.game.boardOne;

		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 10; col++) {
				const cell = document.createElement('div');
				cell.classList.add('cell');
				cell.dataset.row = row;
				cell.dataset.col = col;

				if (boardState.grid[row][col] !== null) {
					cell.classList.add('ship');
				}

				// Drag and Drop Events for Cells
				cell.addEventListener('dragover', (e) => {
					e.preventDefault(); // Necessary to allow dropping
					cell.classList.add('drag-over');
				});

				cell.addEventListener('dragleave', () => {
					cell.classList.remove('drag-over');
				});

				cell.addEventListener('drop', (e) => this.handleDrop(e));

				this.setupBoard.appendChild(cell);
			}
		}
	}

	handleDrop(e) {
		e.preventDefault();
		e.target.classList.remove('drag-over');

		const row = parseInt(e.target.dataset.row, 10);
		const col = parseInt(e.target.dataset.col, 10);

		try {
			// Attempt to place the ship on Player One's board
			const newShip = new Ship(this.draggedShipLength);
			this.game.boardOne.placeShip(newShip, row, col, this.isVertical);
			
			// If successful: update UI, remove ship from yard
			this.renderSetupBoard();
			this.draggedShipElement.remove();
			this.shipsPlaced++;

			// Enable start button once all 5 ships are placed
			if (this.shipsPlaced === 5) {
				this.startBtn.disabled = false;
                this.shipyard.classList.add('hidden');
                this.rotateBtn.disabled = true;
			}
		} catch (error) {
			// If placement is invalid (out of bounds/overlap), ignore the drop
			console.warn(error.message);
		}
	}
}