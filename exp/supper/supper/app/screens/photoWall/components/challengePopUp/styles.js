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
		backgroundColor: colors.white,
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
	cancelButton: {
		backgroundColor: '#ED5757',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: 120,
		marginRight: 10,
	},
	unlockButton: {
		backgroundColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: 120,
	},
	buttonText: {
		color: colors.white,
		textAlign: 'center',
	},
	banner: {
		width: 270,
		height: 70,
		top: -50,
		alignSelf: 'center',
	},
	unlockGif: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		marginTop: -40,
	},
	instructionView: {
		padding: 10,
		marginTop: 10,
		marginHorizontal: 20,
		backgroundColor: colors.secondary,
		borderRadius: 5,
	},
	instructionText: {
		color: colors.primaryFont,
		textAlign: 'center',
	},
});
