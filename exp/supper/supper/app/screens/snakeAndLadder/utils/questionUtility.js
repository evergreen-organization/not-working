import { getImageWidth } from 'screens/photoWall/utils';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const getLengthOfLongestString = (strings) => {
	if (strings.length === 0) {
		return 0;
	}

	return strings.reduce((longestLength, current) => Math.max(longestLength, current.length), 0);
};

export const getDynamicBlockSize = (length) =>
	(width - width * 0.2 - getImageWidth(8) - getImageWidth(2)) / length;

export const convertHtmlToString = (string) => {
	if (!string) {
		return '';
	}
	return string.split('<br />').join('\n');
};
