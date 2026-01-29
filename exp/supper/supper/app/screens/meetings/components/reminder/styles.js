import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 5,
	},
	eventButton: {
		width: 55,
		height: 55,
		marginRight: 5,
	},
	eventButtonText: {
		color: colors.white,
	},
	eventButtonSubText: {
		color: colors.white,
	},
	buttonView: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
