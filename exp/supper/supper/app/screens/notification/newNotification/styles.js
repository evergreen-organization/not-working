import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	view: {
		paddingHorizontal: 20,
		backgroundColor: colors.white,
		paddingVertical: 20,
	},
	message: {
		height: 100,
		textAlignVertical: 'top',
	},
});
