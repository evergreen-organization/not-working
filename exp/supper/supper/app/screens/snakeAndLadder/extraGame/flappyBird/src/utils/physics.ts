import Matter from 'matter-js';
import { Dimensions } from 'react-native';

import { getPipeSizePosPair } from './ramdom';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

const windowWidth = Dimensions.get('window').width;

export const Physics = (entities, { touches, time, dispatch }) => {
	let engine = entities.physics.engine;

	// Initialize game start time
	if (!entities.gameStartTime) {
		entities.gameStartTime = time.current;
	}

	const timeSinceStart = time.current - entities.gameStartTime;
	const PIPE_DELAY_MS = 3000;

	// Flap logic
	touches
		.filter((t) => t.type === 'press')
		.forEach(() => {
			playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
			Matter.Body.setVelocity(entities.Bird.body, { x: 0, y: -4 });
		});

	if (timeSinceStart > PIPE_DELAY_MS) {
		for (let index = 1; index <= 2; index++) {
			const topObstacle = entities[`ObstacleTop${index}`];
			const bottomObstacle = entities[`ObstacleBottom${index}`];
			const birdX = entities.Bird.body.position.x;

			Matter.Body.translate(topObstacle.body, { x: -4, y: 0 });
			Matter.Body.translate(bottomObstacle.body, { x: -4, y: 0 });

			if (topObstacle.body.bounds.max.x <= 0) {
				const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
				Matter.Body.setPosition(topObstacle.body, pipeSizePos.pipeTop.pos);
				Matter.Body.setPosition(bottomObstacle.body, pipeSizePos.pipeBottom.pos);
				topObstacle.scored = false;
			}

			if (!topObstacle.scored && topObstacle.body.position.x + 50 < birdX) {
				topObstacle.scored = true;
				dispatch({ type: 'score' });
			}
		}
	}

	Matter.Engine.update(engine, time.delta);

	Matter.Events.on(engine, 'collisionStart', () => {
		dispatch({ type: 'game_over' });
	});

	return entities;
};
