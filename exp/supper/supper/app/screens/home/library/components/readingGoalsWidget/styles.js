import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 10,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	rowContainer: { flexDirection: 'row', justifyContent: 'space-between' },
	title: { marginBottom: 15 },
	text: { color: colors.secondaryFont, marginBottom: 8 },
	subtext: { color: colors.secondaryFont, marginTop: 6 },
});
