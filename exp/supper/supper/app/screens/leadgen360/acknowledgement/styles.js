import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	view: {
		paddingHorizontal: 20,
		margin: 20,
		paddingBottom: 30,
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 10,
		// flex: 1,
	},
	title: { flexWrap: 'wrap', marginVertical: 20 },
	text: {
		flexWrap: 'wrap',
		marginVertical: 12,
		textAlign: 'center',
	},
	doneButton: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		margin: 30,
		backgroundColor: colors.primary,
		alignItems: 'center',
		borderRadius: 5,
	},
	doneText: { color: colors.white, fontWeight: 'bold', fontSize: 13 },
	lottie: { height: 50, width: 50 },
	lottie2: { height: 250, width: 250 },
});
