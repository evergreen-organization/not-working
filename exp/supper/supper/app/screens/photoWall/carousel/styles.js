import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { initialBottom } from 'styles';

export const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: '#FFFFFF05',
		shadowRadius: 5,
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'center',
		width: '100%',
		shadowOpacity: 0,
		elevation: 0,
		padding: 10,
	},
	tabBarIndicatorStyle: { opacity: 0 },
	tabBarItemStyle: { width: 25, marginBottom: initialBottom },
	buttonView: {
		flexDirection: 'row',
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		bottom: 50 + initialBottom,
	},
	shareButton: {
		backgroundColor: colors.eCardPrimary,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: 150,
		height: '100%',
		marginHorizontal: 8,
		padding: 10,
		borderWidth: 5,
		borderColor: colors.eCardPrimary,
	},
	editButton: {
		backgroundColor: colors.white,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: 150,
		height: '100%',
		marginHorizontal: 8,
		padding: 10,
		borderWidth: 5,
		borderColor: colors.white,
	},
	shareIcon: {
		width: 20,
		height: 20,
		marginRight: 8,
		tintColor: colors.white,
	},
	editIcon: {
		width: 20,
		height: 20,
		marginRight: 8,
		tintColor: colors.eCardPrimary,
	},
	shareButtonText: {
		backgroundColor: 'transparent',
	},
	bar: {
		position: 'absolute',
		zIndex: 1,
	},

	editButtonText: {
		backgroundColor: 'transparent',
		color: colors.eCardPrimary,
	},
});
