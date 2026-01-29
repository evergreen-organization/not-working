import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
	},
	label: {
		textAlign: 'center',
		letterSpacing: -0.6,
		fontSize: 11,
		color: colors.secondaryFont,
	},
	icon: {
		width: 25,
		height: 25,
	},
});
