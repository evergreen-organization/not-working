import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerText: {
		flex: 1,
	},
	button: {
		width: 50,
		marginLeft: 8,
		paddingVertical: 8,
		borderRadius: 20,
		alignItems: 'center',
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
	chart: {
		flex: 1,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	},
});
