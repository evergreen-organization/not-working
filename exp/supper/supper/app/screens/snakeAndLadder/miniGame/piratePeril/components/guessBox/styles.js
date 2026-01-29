import { StyleSheet } from 'react-native';
import { getImageWidth } from 'screens/photoWall/utils';

export const styles = StyleSheet.create({
	inputContainer: {
		// padding: getImageWidth(10),
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: getImageWidth(10),
		// marginVertical: getImageHeight(20),
		borderRadius: 10,
	},
	input: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
	},
	inputView: {
		flexDirection: 'row',
		// flexWrap: 'wrap',
		justifyContent: 'center',
	},
	letterBox: {
		width: getImageWidth(45),
		height: getImageWidth(45),
		borderBottomWidth: 1.3,
		justifyContent: 'center',
		borderBottomColor: '#fff',
	},
});
