import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: colors.white,
		padding: 12,
		borderRadius: 10,
	},
	details: { color: colors.secondaryFont, marginTop: 5 },
	date: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
	},
	line: { height: '100%', width: 2.5, backgroundColor: colors.primary },
	dateContainer: { paddingHorizontal: 10, alignItems: 'center' },
	dateday: { fontSize: 9 },
	month: { color: colors.secondaryFont },
	icon: { width: 40, height: 40 },
	image: { position: 'absolute', right: 0, bottom: 0 },
	view: { marginRight: 10 },
	flex: { flex: 1 },
	content: { paddingHorizontal: 5 },
	container: {
		flex: 1,
		width: width,
		paddingHorizontal: 20,
	},
});
