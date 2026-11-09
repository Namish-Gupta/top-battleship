import './style.css';

export default class DOMController {
	constructor(gameController) {
		this.game = gameController;
		this.playerBoardEl = document.getElementById('player-board');
		this.computerBoardEl = document.getElementById('computer-board');
		this.messageDisplay = document.getElementById('message-display');
		
		this.renderBoards();
	}

	renderBoards() {
		this.renderBoard(this.game.boardOne, this.playerBoardEl, true);
		this.renderBoard(this.game.boardTwo, this.computerBoardEl, false);
	}

	renderBoard(board, container, isPlayerBoard) {
		container.innerHTML = ''; // Wipe clean before rendering
		
		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 10; col++) {
				const cell = document.createElement('div');
				cell.classList.add('cell');
				cell.dataset.row = row;
				cell.dataset.col = col;

				// Make enemy cells interactive
				if (!isPlayerBoard) {
					cell.classList.add('enemy');
					cell.addEventListener('click', (e) => this.handleCellClick(e));
				}

				// Reveal ships only on the player's board
				if (isPlayerBoard && board.grid[row][col] !== null) {
					cell.classList.add('ship');
				}

				// Render hits and misses
				const coordKey = `${row},${col}`;
				if (board.attacks.has(coordKey)) {
					const status = board.attacks.get(coordKey);
					cell.classList.add(status); 
					
					if (!isPlayerBoard) {
						cell.classList.remove('enemy');
						// Prevent clicking the same cell twice via CSS
						cell.style.pointerEvents = 'none';
					}
				}

				container.appendChild(cell);
			}
		}
	}

	handleCellClick(e) {
		const row = parseInt(e.target.dataset.row, 10);
		const col = parseInt(e.target.dataset.col, 10);

		try {
			this.game.playRound(row, col);
			this.renderBoards();

			const winner = this.game.checkWinner();
			if (winner) {
				const winnerName = winner.type === 'real' ? 'You' : 'The Computer';
				this.messageDisplay.textContent = `${winnerName} won the game!`;
				// Lock the board when the game is over
				this.computerBoardEl.style.pointerEvents = 'none';
			}
		} catch (error) {
			console.error(error.message);
		}
	}
}