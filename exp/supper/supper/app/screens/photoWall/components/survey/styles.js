import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	successContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	successImage: {
		width: 200,
		height: undefined,
		aspectRatio: 1,
	},
	loadingImage: {
		width: '30%',
		alignSelf: 'center',
		aspectRatio: 1,
	},
	loadingContainer: {
		height: window.height,
	},
	previousTaskContainer: {
		height: window.height,
		padding: 20,
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
	},
	instructionView: {
		padding: 10,
		marginTop: 10,
		marginHorizontal: 20,
	},
});
