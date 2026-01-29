import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	noticeContainer: {
		backgroundColor: colors.white,
	},
	notice: {
		textAlign: 'center',
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	imageContainer: {
		alignItems: 'center',
		paddingTop: 12,
		marginBottom: -8,
	},
	image: {
		width: 60,
		height: 60,
		tintColor: colors.primary,
	},
	footer: { backgroundColor: '#F5F5F5', marginTop: 12 },
	headerContainer: { backgroundColor: '#F5F5F5', paddingTop: 10 },
	headerView: { flexDirection: 'row', marginHorizontal: 20 },
	container: {
		backgroundColor: colors.white,
		paddingVertical: 8,
		paddingHorizontal: 20,
	},
	noReminderText: {
		color: colors.secondaryFont,
	},
	noReminderView: { alignItems: 'center', marginVertical: 10 },
	reminderDetail: {
		paddingVertical: 12,
	},
	text: {
		marginTop: 5,
	},
});
