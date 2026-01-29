import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: colors.white,
	},
	touchableCard: {
		marginHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	image: {
		borderRadius: 5,
		height: 180,
		resizeMode: 'cover',
	},
	mainText: {
		marginTop: 10,
		marginBottom: 5,
	},
	subText: {
		color: colors.secondaryFont,
	},
	notice: {
		textAlign: 'center',
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	flex: {
		flex: 1,
	},
});
