import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	content: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	title: {
		marginBottom: 10,
	},
	bodyContainer: {
		paddingTop: 12,
	},
	body: {
		fontSize: 14,
	},
	attendeeContainer: {
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	attendeeIcon: {
		paddingRight: 20,
	},
	nothingText: {
		fontSize: 14,
		color: colors.secondaryFont,
	},
	meetingView: {
		padding: 20,
		paddingTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	noAttendeesView: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
	},
	link: { color: colors.primary },
});
