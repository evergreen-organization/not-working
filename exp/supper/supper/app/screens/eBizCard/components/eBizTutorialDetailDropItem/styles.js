import { colors } from 'configs';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		borderColor: colors.white,
		borderTopWidth: 1,
		paddingTop: 8,
		paddingBottom: 24,
		flexDirection: 'row',
		alignItems: 'center',
	},
	vwLabel: {
		flex: 1,
		flexDirection: 'row',
	},
	lblBullet: {
		alignSelf: 'flex-start',
		fontSize: 16,
		fontWeight: 'bold',
		width: 30,
		marginRight: 4,
		textAlign: 'center',
	},
	lblTitle: {
		alignSelf: 'flex-start',
		fontSize: 16,
		fontWeight: 'bold',
		flex: 1,
	},
	image: {
		width: 24,
		height: 24,
		marginLeft: 12,
		tintColor: colors.primary,
	},
});
