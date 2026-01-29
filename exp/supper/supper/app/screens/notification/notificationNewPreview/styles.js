import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	content: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingBottom: 12,
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		resizeMode: 'contain',
		height: 80,
		width: 80,
	},
	leftContainer: {
		flex: 1,
	},
	rightContainer: {
		flex: 1,
		alignItems: 'flex-end',
	},
	heading: {
		color: colors.secondaryFont,
		marginBottom: 5,
	},
	title: {
		marginBottom: 10,
		paddingBottom: 12,
	},
	body: {
		marginBottom: 10,
	},
	description: {
		color: colors.secondaryFont,
	},
	divider: {
		borderTopWidth: 1,
		borderTopColor: colors.medium,
	},
	buttonRowContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
	discardButton: {
		backgroundColor: colors.black,
	},
	sendButton: {
		backgroundColor: colors.primary,
	},
	flex: {
		flex: 1,
	},
});
