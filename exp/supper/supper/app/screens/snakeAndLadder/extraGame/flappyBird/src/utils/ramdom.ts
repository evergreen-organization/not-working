import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePosPair = (addToPosX = 0) => {
	let yPosTop = -getRandom(180, windowHeight - 900);

	const pipeTop = {
		pos: { x: windowWidth + addToPosX + 20, y: yPosTop },
		size: { height: 480, width: 55 },
	};
	const pipeBottom = {
		pos: { x: windowWidth + addToPosX + 20, y: windowHeight - 50 + yPosTop },
		size: { height: 480, width: 55 },
	};

	return { pipeTop, pipeBottom };
};
