import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	course: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	title: {
		fontSize: 12,
		color: colors.primaryFont,
		marginBottom: 5,
	},
	desc: {
		fontSize: 12,
		color: colors.secondaryFont,
		marginTop: 2,
	},
});
