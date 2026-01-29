import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		alignItems: 'center',
		paddingTop: 12,
	},
	title: {
		marginBottom: 10,
	},
	desc: {
		marginBottom: 5,
		textAlign: 'center',
	},
	text: { paddingHorizontal: 15, marginBottom: 5, color: colors.secondaryFont },
	view: { flexDirection: 'row', alignItems: 'center' },
});
