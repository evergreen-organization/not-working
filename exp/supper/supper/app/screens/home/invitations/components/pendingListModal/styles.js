import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	listContainer: {
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	item: {
		borderBottomWidth: 0.33,
		borderBottomColor: '#E6E6E6',
		paddingVertical: 10,
	},
	text: { marginBottom: 4 },
	subtext: { color: colors.oldLavender },
});
