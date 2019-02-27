import solver, { RubiksCube } from 'rubiks-cube-solver';

class Demo {
	constructor() {
		this._onClick = this._onClick.bind(this);

		this._button = document.querySelector('.button');
		this._scrambleMoves = document.querySelector('.scramble-moves');
		this._solveContainer = document.querySelector('.move-container-solve');
		this._solveAltContainer = document.querySelector('.move-container-solve-alt');

		this._button.addEventListener('click', this._onClick);

		this._populateDemo();
	}

	_onClick() {
		this._populateDemo();
	}

	_populateDemo() {
		const scrambleMoves = RubiksCube.getRandomMoves();

		const cube = RubiksCube.FromMoves(scrambleMoves);
		const solveMoves = solver(cube.clone());
		const partitions = solver(cube.clone(), { partitioned: true });

		this._populateDemoScramble(scrambleMoves);
		this._populateDemoSolve(solveMoves);
		this._populateDemoPartitions(partitions);
	}

	_populateDemoScramble(scrambleMoves) {
		this._scrambleMoves.textContent = this._getPrettyMoves(scrambleMoves);
	}

	_populateDemoSolve(solveMoves) {
		const moves = this._solveContainer.querySelector('.moves');
		const movesAlt = this._solveAltContainer.querySelector('.moves');

		moves.textContent = this._getPrettyMoves(solveMoves);
		movesAlt.textContent = this._getPrettyMoves(RubiksCube.transformMoves(solveMoves, {
			orientation: { front: 'front', down: 'up' }
		}));
	}

	_populateDemoPartitions(partitions) {
		const partitionsEl = this._solveContainer.querySelector('.partitions');
		const partitionsAltEl = this._solveAltContainer.querySelector('.partitions');

		for (const phase of Object.keys(partitions)) {
			const li = partitionsEl.querySelector(`.moves-${phase}`);
			const liAlt = partitionsAltEl.querySelector(`.moves-${phase}`);

			const moves = partitions[phase];
			const transformed = Array.isArray(moves) ?
				moves.map(moves => this._getTransformedMoves(moves)) :
				this._getTransformedMoves(moves);

			li.textContent = this._getPrettyMoves(moves);
			liAlt.textContent = this._getPrettyMoves(transformed);
		}
	}

	_getTransformedMoves(moves) {
		return RubiksCube.transformMoves(moves, {
			orientation: { front: 'front', down: 'up' }
		});
	}

	_getPrettyMoves(moves) {
		// if array, then it holds not an array of single moves, but an array of
		// a move group, and each group should be contained inside []
		if (Array.isArray(moves)) {
			moves = moves.map(moveGroup => `[${moveGroup}]`).join(', ');
		}

		return moves.replace(/prime/ig, '\'');
	}
}

new Demo();
