import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
	meetingContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		paddingVertical: 12,
		borderRadius: 10,
	},
	meetingDate: {
		marginLeft: 10,
	},
	meetingDetails: {
		flex: 1,
		marginRight: 10,
		// borderBottomWidth: 1,
		// borderBottomColor: colors.medium,
	},
	yearContainer: { alignItems: 'center', marginTop: 15, marginBottom: 5 },
	yearText: {
		fontSize: RFValue(22, 812),
		color: colors.oldLavender,
	},
});
