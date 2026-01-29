import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
	container: {
		marginTop: 100,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 20,
		height: 50,
	},
	headerText: {
		color: colors.primaryFont,
		flex: 1,
	},
	headerIconContainer: {
		padding: 6,
		marginRight: -6,
	},
	headerIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	tabContainer: {
		borderBottomWidth: 0,
		backgroundColor: '#F5F5F5',
		marginTop: 10,
		marginBottom: 20,
		elevation: 0,
		height: 35,
		marginHorizontal: 20,
	},
	tabBarUnderline: {
		height: 0,
	},
	tab: {
		backgroundColor: 'transparent',
	},
	activeTab: {
		backgroundColor: colors.primary,
		borderRadius: 20,
	},
	tabText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(14, 812),
		color: colors.secondaryFont,
	},
	activeTabText: {
		fontFamily: 'Montserrat-Regular',
		fontWeight: '400',
		fontSize: RFValue(14, 812),
		color: colors.white,
	},
	tabContent: {
		backgroundColor: '#F5F5F5',
	},
	modalContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.medium,
	},
	icon: {
		fontSize: 22,
		color: colors.primary,
		marginRight: 10,
		marginLeft: -4,
	},
});
