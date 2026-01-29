import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	productButtonContainer: {
		backgroundColor: colors.white,
		padding: 10,
		marginTop: -5,
		marginVertical: 10,
	},
	productViewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	productName: {
		flex: 1.5,
		left: -2,
	},
	productStatusImage: {
		width: 18,
		height: 18,
		marginRight: 10,
	},
	productStatusTitle: {
		flex: 0.5,
		marginRight: -10,
		flexWrap: 'wrap',
	},
	arrowIcon: {
		fontSize: 25,
	},
	detailsContainer: {
		backgroundColor: colors.white,
		marginHorizontal: 10,
		marginTop: -10,
		borderRadius: 5,
	},
	productItemContainer: {
		marginTop: 10,
		paddingHorizontal: 0,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	labelText: {
		flex: 1,
	},
	valueText: {
		flex: 1,
		textAlign: 'right',
	},
	border: {
		borderLeftWidth: 3,
		alignSelf: 'stretch',
		marginVertical: 10,
		top: -5,
		borderRadius: 5,
	},
	statusContainer: {
		paddingVertical: 10,
		marginTop: 10,
		marginBottom: 15,
		marginHorizontal: -10,
		paddingHorizontal: 10,
	},
	status: {
		marginTop: 20,
		paddingHorizontal: 0,
	},
	view: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	statusText: {
		fontSize: 12,
		flexWrap: 'wrap',
		marginVertical: 5,
	},
});
