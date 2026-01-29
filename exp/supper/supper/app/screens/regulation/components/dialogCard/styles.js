import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	answerCardText: {
		flex: 1,
		fontSize: 12,
		textAlign: 'left',
	},
});
