import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	dropdownContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.border,
		height: 45,
		borderRadius: 10,
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	leftIconContainer: {
		paddingRight: 12,
	},
	rightIconContainer: {
		paddingLeft: 12,
	},
	textContainer: {
		flex: 1,
	},
	text: {
		fontSize: 13,
	},
	icon: {
		width: 25,
		height: 25,
		tintColor: colors.primary,
	},
	rightIcon: {
		fontSize: 25,
		color: colors.primary,
		marginRight: -5,
	},
	container: {
		marginBottom: 15,
	},
	listItem: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	modalTitleView: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 5,
	},
	modalTitle: {
		color: colors.shadow,
	},
	searchView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchText: {
		paddingHorizontal: 20,
		height: 50,
	},
	searchIconView: {
		position: 'absolute',
		right: 0,
	},
	searchIcon: {
		width: 12,
		height: 12,
		tintColor: colors.shadow,
		marginHorizontal: 20,
	},
});

export default styles;
