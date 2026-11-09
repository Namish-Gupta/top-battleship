import GameController from './gameController';
import DOMController from './domController';

document.addEventListener('DOMContentLoaded', () => {
	const game = new GameController();
	const dom = new DOMController(game);
});