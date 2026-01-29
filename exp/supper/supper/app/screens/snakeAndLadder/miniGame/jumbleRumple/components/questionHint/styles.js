import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	questionContainer: {
		borderRadius: 10,
		paddingHorizontal: 15,
		marginTop: 10,
		alignItems: 'center',
		width: '100%',
	},

	underlineTitle: {
		textAlign: 'center',
		marginTop: 20,
		color: colors.brown,
	},
	hintText: {
		textAlign: 'center',
		color: colors.black,
		flex: 1,
	},
	buttonContainer: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 100,
	},

	buttonIcon: {
		width: 15,
		height: 15,
	},
	leftButton: {
		marginHorizontal: 0,
		padding: 5,
		justifyContent: 'center',
	},
	rightButton: {
		marginHorizontal: 0,
		padding: 5,
		justifyContent: 'center',
		transform: [{ rotate: '180deg' }],
	},
	bg: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20,
		backgroundColor: 'grey',
		borderRadius: 25,
	},
});
