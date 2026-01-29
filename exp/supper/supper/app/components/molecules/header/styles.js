import { StyleSheet } from 'react-native';
import { colors } from 'configs/colors';

export const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		color: colors.primaryFont,
	},
	leftButtonContainer: {
		backgroundColor: colors.iconBackground,
		width: 40,
		marginLeft: 20,
		borderRadius: 5,
		alignItems: 'center',
	},
	rightButtonContainer: {
		minWidth: 40,
		marginRight: 20,
		borderRadius: 5,
		backgroundColor: colors.iconBackground,
	},
});
