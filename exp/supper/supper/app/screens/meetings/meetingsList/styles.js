import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	reachEnd: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	meetingList: {
		marginHorizontal: 10,
		marginBottom: 12,
	},
	noticeContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	notice: {
		textAlign: 'center',
		fontSize: 14,
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
});
