import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerTitle: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.black,
	},
	headerCenter: { marginLeft: 5 },
	view: {
		flex: 1,
		backgroundColor: colors.white,
		paddingHorizontal: 12,
	},

	noDataText: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	viewSearched: {
		flex: 1,
		padding: 10,
		flexDirection: 'row',
	},
	questionText: {
		fontSize: 14,
		color: '#717171',
	},
	answerContainer: {
		paddingLeft: 16,
		paddingVertical: 8,
	},
	answerText: {
		fontSize: 14,
		color: '#717171',
	},
});
