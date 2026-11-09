import GameController from './gameController';
import DOMController from './domController';
import SetupController from './setupController';

document.addEventListener('DOMContentLoaded', () => {
	const playAgainBtn = document.getElementById('play-again-btn');
	const shipyard = document.getElementById('shipyard');
	
	// Cache the original HTML so we can restore the draggable ships later
	const originalShipyardHTML = shipyard.innerHTML;

	function initGame() {
		// Reset UI Visibility
		playAgainBtn.classList.add('hidden');
		document.getElementById('game-container').classList.remove('active');
		document.getElementById('game-container').classList.add('hidden');
		document.getElementById('setup-container').classList.remove('hidden');
		document.getElementById('setup-container').classList.add('active');
		shipyard.classList.remove('hidden');
		
		// Reset messaging and buttons
		document.getElementById('message-display').textContent = 'Place your fleet, Commander.';
		document.getElementById('start-game-btn').disabled = true;
		document.getElementById('rotate-btn').disabled = false;
		
		// Restore the DOM elements for the draggable ships
		shipyard.innerHTML = originalShipyardHTML;

		// Re-instantiate the core game classes for a totally fresh state
		const game = new GameController();
		const dom = new DOMController(game);
		new SetupController(game, dom);
	}

	playAgainBtn.addEventListener('click', initGame);
	
	// Start the very first game
	initGame();
});