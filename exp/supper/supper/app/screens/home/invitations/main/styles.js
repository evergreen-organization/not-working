import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	title: { marginBottom: 5 },
	subtitle: { color: colors.secondaryFont },
	clickableText: { color: colors.primary, marginTop: 5 },
	eventList: {
		backgroundColor: colors.white,
		marginTop: 20,
		paddingHorizontal: 20,
		paddingVertical: 8,
	},
	detailsRowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	reasonModalContainer: { paddingHorizontal: 20, paddingVertical: 20 },
	inputContainer: {
		height: 120,
		backgroundColor: colors.secondary,
		borderRadius: 10,
		marginTop: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginVertical: 10,
	},
	noticeContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	notice: {
		textAlign: 'center',
		marginVertical: 12,
	},
	imageContainer: {
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
		tintColor: colors.primary,
	},
	flex: {
		flex: 1,
	},
	reloadIcon: { color: colors.primary, fontSize: 25 },
});
