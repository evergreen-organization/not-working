import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const standardRefWidth = 390;
const standardRefHeight = 844;
const standardRefDimension = standardRefWidth * standardRefHeight;

const widthScale = width / standardRefWidth;
const heightScale = height / standardRefHeight;
const dimensionScale = (width * height) / standardRefDimension;
const dimension = width * height;

const pi = Math.PI;

const getCircleArea = (radius) => pi * radius * radius;

const getCircleAreaScale = (diameter) => getCircleArea(diameter / 2) / standardRefDimension;

export const getCircleSize = (circleSize) =>
	Math.sqrt((getCircleAreaScale(circleSize) * dimension) / pi) * 2;
export const getLeftShift = (standardShiftRef) => widthScale * standardShiftRef;
export const getTopShift = (standardShiftRef) => heightScale * standardShiftRef;
export const getImageWidth = (standardRef) => widthScale * standardRef;
export const getImageHeight = (standardRef) => heightScale * standardRef;

export const getRefSize = (standardRef) => (standardRef / standardRefDimension) * dimension;
