import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	shareContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
	},
	shareIcon: { fontSize: 25, color: colors.primary },
	shareText: { color: colors.secondaryFont, marginTop: 10 },
	text: { flexWrap: 'wrap', marginTop: 10, textAlign: 'center' },
	url: {
		marginTop: 20,
		flexWrap: 'wrap',
		color: 'blue',
		textDecorationLine: 'underline',
	},
	instruction: {
		marginTop: 20,
		flexWrap: 'wrap',
		textAlign: 'center',
	},
	eCFText: { fontSize: 13, marginTop: 30 },
	refNumberView: {
		borderRadius: 5,
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: colors.medium,
		paddingHorizontal: 50,
		padding: 10,
		alignItems: 'center',
		marginTop: 10,
	},
	refNumber: { fontSize: 13, color: colors.shadow },
	instructionView: {
		backgroundColor: colors.lightYellow,
		alignItems: 'center',
		padding: 10,
		marginTop: 20,
		borderRadius: 5,
	},
	lottie: { width: 100, height: 150, marginVertical: 10, marginBottom: 25 },
	link: {
		color: colors.shadow,
		textAlign: 'center',
		marginTop: 10,
		fontStyle: 'italic',
		fontWeight: 'bold',
	},
});
