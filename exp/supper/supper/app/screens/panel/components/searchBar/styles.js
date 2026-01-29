import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	searchItem: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#999',
		marginRight: 5,
	},
	searchInput: {
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(15, 812),
		color: colors.primaryFont,
		height: 44,
		fontWeight: 'bold',
		flex: 1,
	},
	searchIcon: {
		fontSize: 20,
		color: colors.primary,
		position: 'absolute',
		right: 10,
	},
	searchView: {
		flex: 1,
		marginRight: 10,
	},
	iconView: {
		justifyContent: 'center',
	},
});
