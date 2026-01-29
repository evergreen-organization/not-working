import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	textContainer: {
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
	},
	text: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingVertical: 12,
		color: colors.secondaryFont,
	},
	bottomView: {
		paddingHorizontal: 20,
		marginTop: 20,
		flex: 1,
	},
});
