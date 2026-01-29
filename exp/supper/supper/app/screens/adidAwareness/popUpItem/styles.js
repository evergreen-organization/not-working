import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.9,
	},
	title: {
		marginTop: 30,
		fontSize: 16,
		lineHeight: 22,
		width: width * 0.8,
		marginHorizontal: 20,
	},
	icon: {
		width: 20,
		height: 20,
		paddingRight: 10,
	},
	details: {
		flex: 2,
		width: width * 0.8,
		alignSelf: 'center',
	},
});
