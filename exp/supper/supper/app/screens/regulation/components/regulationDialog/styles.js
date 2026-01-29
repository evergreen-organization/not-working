import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerTitle: {
		flex: 1,
	},
	contentContainer: {
		width: '100%',
		backgroundColor: colors.white,
		paddingHorizontal: 15,
		marginBottom: 10,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingRight: 10,
		paddingVertical: 12,
	},
	answer: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingBottom: 12,
	},
	bottomRadius: {
		marginBottom: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	topRadius: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
});
