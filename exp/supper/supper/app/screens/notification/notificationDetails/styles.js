import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 20,
		backgroundColor: colors.white,
		paddingVertical: 12,
	},
	title: {
		fontSize: 18,
		marginBottom: 10,
		paddingBottom: 12,
	},
	subTopic: {
		fontSize: 14,
		marginTop: 20,
		marginBottom: 8,
	},
	heading: {
		fontSize: 14,
		color: colors.primaryFont,
		marginBottom: 10,
	},
	paragraph: {
		fontSize: 14,
		color: colors.secondaryFont,
	},
	link: {
		fontSize: 14,
		color: colors.primary,
	},
	fromContainer: {
		marginTop: 20,
	},
	notificationImage: {
		resizeMode: 'contain',
		height: 60,
		width: 60,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
});
