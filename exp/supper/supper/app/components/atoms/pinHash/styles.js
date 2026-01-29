import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	pinContainer: {
		width: '60%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	pin: {
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: colors.secondaryFont,
	},
	filledPin: {
		backgroundColor: colors.secondaryFont,
	},
});
