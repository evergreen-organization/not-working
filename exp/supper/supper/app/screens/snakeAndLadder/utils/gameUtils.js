import { routes } from 'navigations';
import { BINGO_TYPE, GAME_TYPE } from '../constant/constant';
import {
	boxCordinates,
	columns,
	infoMessages,
	startCoordinate,
} from '../mainScreen/snakeLadderScreen/conf';

const gameRouteConfig = {
	[BINGO_TYPE.balloon]: routes.BALLOON_POP,
	[BINGO_TYPE.reading]: routes.BINGO_READING_QUESTION,
	[BINGO_TYPE.bomb]: routes.BOMB_DIFFUSER,
	[BINGO_TYPE.pirate]: routes.PIRATE_PERIL,
	[BINGO_TYPE.jumble]: routes.JUMBLE_RUMPLE,
	[BINGO_TYPE.boss]: routes.BOSS_GAME,
	[BINGO_TYPE.truefalse]: routes.TRUE_TRAPPED,
	[BINGO_TYPE.flappybird]: routes.FLAPPY_BIRD,
	[BINGO_TYPE.whack]: routes.WHACK_AMOLE,
	[BINGO_TYPE.spaceshooter]: routes.SPACE_SHOOTER,
};

export const gameUtils = () => {
	const getRoute = (type) => {
		const route = gameRouteConfig[type];
		if (!route) {
			console.error(`No route found for type: ${type}`);
			return null;
		}
		return route;
	};

	const getBoardPosition = (playerPosition) => {
		const boardNo = Math.floor(playerPosition / 52);
		const tileNo = playerPosition % 52;
		return {
			boardNo,
			tileNo,
		};
	};

	const getPlayerPosition = ({ boardNo, tileNo }) => {
		return boardNo * 52 + tileNo;
	};

	const checkStartSnakeOrLadder = ({ boardTiles, position }) => {
		return Object.keys(boardTiles).some((key) => Number(key) === position);
	};

	const checkEndSnakeOrLadder = ({ boardTiles, position }) => {
		return Object.values(boardTiles).some((value) => Number(value) === position);
	};

	const checkDestinationTile = ({ boardTiles, position }) => {
		const destinationTiles = Object.values(boardTiles).map((v) => parseInt(v, 10));
		return destinationTiles.includes(position);
	};

	const getTileCoordinates = (position) => {
		if (position < 1 || position > 50) {
			console.warn(`Invalid tile: ${position}`);
			return startCoordinate;
		}

		const row = Math.floor((position - 1) / columns);
		const column = (position - 1) % columns;
		return boxCordinates[row][column];
	};

	const getRandomMessage = (shownMessages = []) => {
		const unseenMessages = infoMessages.filter((msg) => !shownMessages.includes(msg));
		if (unseenMessages.length === 0) {
			return null;
		}
		return unseenMessages[Math.floor(Math.random() * unseenMessages.length)];
	};

	const getQuestionType = (gameType) => {
		switch (gameType) {
			case BINGO_TYPE.reading:
			case BINGO_TYPE.bomb:
				return GAME_TYPE.MCQ;
			case BINGO_TYPE.jumble:
			case BINGO_TYPE.pirate:
				return GAME_TYPE.STRING;
			case BINGO_TYPE.truefalse:
				return GAME_TYPE.BOOL;
			case BINGO_TYPE.boss:
				return GAME_TYPE.BOSS;
			case BINGO_TYPE.flappybird:
			case BINGO_TYPE.whack:
			case BINGO_TYPE.spaceshooter:
				return GAME_TYPE.GAME;
			default:
				return null;
		}
	};

	const getGameRouteAndType = (type) => {
		const gameRoute = getRoute(type);
		if (!gameRoute) {
			console.error(`Invalid game type: ${type}`);
			return { error: 'Invalid game type' };
		}

		const gameType = getQuestionType(type);
		if (!gameType) {
			console.error(`No question type found for game type: ${type}`);
			return { error: 'Invalid question type' };
		}

		return { gameRoute, gameType };
	};

	return {
		getRoute,
		getBoardPosition,
		getPlayerPosition,
		checkStartSnakeOrLadder,
		checkEndSnakeOrLadder,
		checkDestinationTile,
		getRandomMessage,
		getTileCoordinates,
		getQuestionType,
		getGameRouteAndType,
	};
};
