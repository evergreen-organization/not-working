import { StyleSheet } from 'react-native';
import { getCircleSize, getImageWidth, getLeftShift, getTopShift } from 'screens/photoWall/utils';

export const styles = StyleSheet.create({
	underlineTitle: {
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	answerView: {
		marginTop: 0,
		borderRadius: 10,
		marginHorizontal: getImageWidth(8),
		paddingVertical: getImageWidth(20),
		flex: 1,
	},
	answerKey: {
		paddingVertical: getImageWidth(8),
		margin: getImageWidth(2),
		alignItems: 'center',
	},
	answerCharacter: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: getImageWidth(8),
		// marginTop: getTopShift(8),
		justifyContent: 'center',
		width: '100%',
	},
	bg: {
		flex: 1,
		alignSelf: 'center',
		paddingVertical: getTopShift(35),
		paddingLeft: getLeftShift(3),
	},
	imageBackground: {
		transform: [{ scaleX: getCircleSize(1.8) }, { scaleY: getCircleSize(1.3) }],
	},
	bgView: { paddingVertical: getTopShift(30) },
});
