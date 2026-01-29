import { screenHeight, screenWidth } from 'constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	androidImageContainer: {
		height: screenHeight / 1.8,
		overflow: 'hidden',
	},
	androidImage: {
		height: undefined,
		aspectRatio: 0.65,
	},
	iosImageContainer: {
		height: screenHeight / 1.8,
		overflow: 'hidden',
		alignItems: 'center',
		width: screenWidth,
	},
	iosImage: {
		width: screenWidth,
	},
});

export default styles;
