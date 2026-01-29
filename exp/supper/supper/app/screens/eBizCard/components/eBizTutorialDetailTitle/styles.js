import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 24,
		marginVertical: 12,
	},
	image: {
		width: 24,
		height: 24,
		tintColor: colors.primary,
	},
	title: {
		marginLeft: 4,
		fontSize: 18,
		fontWeight: 'bold',
	},
});
