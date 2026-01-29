import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';
import { getImageWidth } from 'screens/photoWall/utils';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
	selectionContainer: {
		width,
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	alphaContainer: {
		maxWidth: '100%',
		marginBottom: 10,
		margin: 1,
		marginHorizontal: 3,
		borderRadius: 10,
		width: getImageWidth(45),
		height: getImageWidth(45),
		justifyContent: 'center',
	},
	alpha: {
		textAlign: 'center',
	},
	actionBtnContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 10,
	},
	actionBtn: {
		marginHorizontal: 20,
	},
});
