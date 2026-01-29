import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	row: { flexDirection: 'row' },
	mandatoryText: {
		color: colors.red,
		marginLeft: 5,
	},
	subtitle: { marginTop: 5, color: colors.secondaryFont },
});
