import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	background: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		borderBottomColor: '#D8D8D8',
	},
	nameText: {
		flex: 1,
		color: colors.primaryFont,
	},
	signOut: {
		color: colors.primaryFont,
		fontSize: 25,
		padding: 12,
		marginRight: -12,
	},
	animatedView: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		zIndex: 1,
		elevation: 1000,
		overflow: 'hidden',
	},
});

export const festiveStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		borderBottomColor: '#D8D8D8',
	},
	nameText: {
		flex: 1,
		color: colors.white,
	},
	animatedView: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		zIndex: 1,
		elevation: 1000,
		overflow: 'hidden',
	},
	avatarContainer: {
		marginLeft: -2,
	},
});

export const festiveStyles2 = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		borderBottomColor: '#D8D8D8',
	},
	nameText: {
		flex: 1,
		color: colors.white,
	},
	animatedView: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		zIndex: 1,
		elevation: 1000,
		overflow: 'hidden',
	},
	avatarContainer: {
		marginLeft: -2,
	},
});
