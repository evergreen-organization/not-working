import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
	headerIconContainer: {
		padding: 6,
		paddingLeft: 10,
	},
	headerIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	content: {
		marginHorizontal: 20,
	},
	progressContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		marginHorizontal: -20,
		paddingVertical: 30,
		marginBottom: 20,
	},
	drinkButtonContainer: {
		flex: 1,
		alignSelf: 'flex-start',
	},
	drinkButton: {
		borderRadius: 15,
		backgroundColor: '#00224B',
		height: 100,
	},
	drinkButtonWrapper: {
		paddingHorizontal: 30,
		marginTop: 5,
	},
	drinkButtonShadow: {
		borderRadius: 15,
	},
	drinkButtonImage: {
		width: 50,
		height: 50,
	},
	drinkTextButton: {
		fontSize: 16,
		color: colors.white,
		textAlign: 'center',
		paddingTop: 12,
	},
	glassSizeContainer: {
		marginBottom: 10,
	},
	glassSizeText: {
		marginBottom: 10,
	},
	glassSizeInfoText: {
		fontSize: RFValue(13, 812),
		color: colors.secondaryFont,
	},
	glassSizeButtonContainer: {
		flexDirection: 'row',
		height: 100,
		marginVertical: 15,
		gap: 10,
	},
	glassSizeButton: {
		flex: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	glassSizeButtonSelected: {
		flex: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.medium,
	},
	glassSizeButtonText: {
		fontSize: 13,
		color: colors.primaryFont,
		marginTop: 5,
	},
	reminderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	reminderText: {
		fontSize: 14,
		flex: 1,
	},
	reminderOffText: {
		fontSize: 14,
		color: colors.secondaryFont,
		textAlign: 'center',
	},
	reminderContent: {
		borderRadius: 8,
		marginTop: 10,
	},
	scheduleContainer: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#D8D8D8',
		paddingVertical: 15,
		marginVertical: 10,
	},
	schedule: {
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	timeSchedule: {},
	footerText: {
		fontSize: 12,
		color: colors.secondaryFont,
		marginHorizontal: 5,
	},
});
