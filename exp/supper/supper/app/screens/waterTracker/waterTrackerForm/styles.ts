import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	content: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	title: {
		marginBottom: 12,
		fontSize: 15,
		color: colors.primaryFont,
	},
	largeGoBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 40,
		backgroundColor: colors.primary,
		borderRadius: 32,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.15,
		shadowRadius: 3,
		elevation: 3,
		marginTop: 10,
	},
	formFooterContainer: { margin: 5, marginHorizontal: 15 },
	formFooterText: { fontSize: 11, color: colors.secondaryFont },
});
