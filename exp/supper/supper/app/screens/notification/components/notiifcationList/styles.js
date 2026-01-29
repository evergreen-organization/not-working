import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: colors.white,
		// height: '100%'
	},
	emptyListContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemContainer: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		marginHorizontal: 20,
		paddingVertical: 12,
	},
	iconContainer: {
		marginRight: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		resizeMode: 'contain',
		width: 30,
		height: 30,
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 13,
		color: colors.primaryFont,
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 12,
		color: colors.secondaryFont,
	},
	timeContainer: {
		justifyContent: 'center',
	},
	duration: {
		fontSize: 12,
		color: colors.primaryFont,
	},
	notice: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	view: { flex: 1, height: height },
});
