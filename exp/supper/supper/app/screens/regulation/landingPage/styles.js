import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		marginBottom: 20,
	},
	descriptionContainer: {
		minHeight: window.height * 0.3,
		maxHeight: window.height * 0.6,
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingTop: 12,
	},
	divider: {
		borderTopWidth: 1,
		borderTopColor: colors.medium,
	},
	favPathContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
		marginTop: 10,
	},
	emptyFavPathText: {
		fontStyle: 'italic',
		color: 'lightgrey',
		margin: 10,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
	iconText: {
		marginLeft: 10,
		fontSize: 12,
		color: colors.black,
	},
	leftButton: {
		backgroundColor: colors.black,
	},
	guideButton: {
		marginHorizontal: 12,
	},
	rightButton: {
		flex: 2,
		paddingHorizontal: 12,
		height: 45,
		marginLeft: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingHorizontal: 10,
		backgroundColor: colors.white,
		borderTopWidth: 0.33,
		borderTopColor: '#D8D8D8',
		zIndex: 111,
	},
	pdf: {
		height: '100%',
		backgroundColor: colors.white,
	},
	favText: {
		color: colors.secondaryFont,
	},
	deleteContainer: {
		justifyContent: 'center',
	},
	deleteIcon: {
		height: 25,
		width: 25,
		tintColor: colors.white,
		marginHorizontal: 2,
	},
	deleteButton: {
		marginVertical: 0,
		margin: 0,
	},
});
