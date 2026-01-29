import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	meetingDetails: {
		flex: 1,
		marginLeft: 10,
		backgroundColor: colors.white,
	},
	meetingDescription: {
		fontSize: 12,
		color: colors.primaryFont,
	},
	content: {
		paddingTop: 5,
		fontSize: 12,
		color: colors.secondaryFont,
	},
	tags: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		marginTop: 5,
	},
	status: {
		color: colors.primaryFont,
		fontSize: 11,
	},
	tooltipButton: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},
	previousButtonText: {
		color: colors.pbxAltFaded,
	},
	finishButtonText: {
		color: colors.pbxAlt,
	},
});
