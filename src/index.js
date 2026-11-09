import GameController from './gameController';
import DOMController from './domController';
import SetupController from './setupController';

document.addEventListener('DOMContentLoaded', () => {
	const game = new GameController();
	const dom = new DOMController(game);

	const setup = new SetupController(game, dom);
});