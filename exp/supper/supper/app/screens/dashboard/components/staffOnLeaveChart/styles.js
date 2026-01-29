import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerText: {
		flex: 1,
	},
	chartNoLegendView: {
		height: 330,
		backgroundColor: colors.white,
	},
	chartOptions: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	chartNoXAxis: {
		flex: 1,
		marginHorizontal: 10,
		marginVertical: 5,
	},
	selectDateOption: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		paddingVertical: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		backgroundColor: '#F5F5F5',
		alignItems: 'center',
	},
	icon: {
		fontSize: 25,
		color: colors.primary,
		paddingLeft: 12,
		marginRight: -5,
	},
	legendView: {
		paddingBottom: 12,
	},
	legendRow: {
		flexDirection: 'row',
		marginHorizontal: 15,
		alignItems: 'center',
	},
	legendIcon: {
		fontSize: 12,
	},
	legendLabel: {
		paddingLeft: 10,
	},
});
