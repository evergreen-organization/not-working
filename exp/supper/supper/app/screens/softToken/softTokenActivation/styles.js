import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	heading: {
		marginHorizontal: 25,
		marginTop: 10,
		marginBottom: 20,
	},
	section: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	sectionHeader: {
		fontSize: 14,
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	settingsContainer: {
		backgroundColor: colors.white,
		marginBottom: 10,
		borderRadius: 10,
	},
	text: {
		fontSize: 14,
		flex: 1,
	},
	errorText: {
		fontSize: 14,
		color: colors.primary,
		marginBottom: 10,
	},
	stepContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
	},
	buttonContainer: {
		marginHorizontal: 30,
		marginBottom: 15,
	},
	buttonDone: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		height: 45,
		justifyContent: 'center',
	},
	labelButton: {
		color: colors.white,
		textAlign: 'center',
	},
});
