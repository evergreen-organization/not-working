import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	fill: {
		flex: 1,
	},
	container: {
		justifyContent: 'center',
		flex: 1,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		flex: 1,
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 3,
	},
	btnText: {
		fontSize: 20,
	},
	icon: {
		width: 22,
		height: 22,
		tintColor: colors.black,
	},
});
