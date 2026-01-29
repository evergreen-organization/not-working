import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000077',
	},
	content: {
		width: width - 60,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		borderWidth: 5,
		borderColor: colors.primary,
	},
	buttonContainer: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	unlockButton: {
		backgroundColor: colors.secondary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: 200,
	},
	buttonText: {
		textAlign: 'center',
	},
	banner: {
		width: 270,
		height: 70,
		top: -50,
		alignSelf: 'center',
	},
	unlockGif: {
		width: 150,
		height: 100,
		alignSelf: 'center',
		marginTop: -40,
	},
	instructionView: {
		padding: 10,
		marginTop: 10,
		marginHorizontal: 20,
	},
	title: {
		textAlign: 'center',
		marginTop: 10,
	},
});
