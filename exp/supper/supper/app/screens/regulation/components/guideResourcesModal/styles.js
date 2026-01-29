import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	modalDraggableHeader: {
		paddingHorizontal: 20,
		height: 40,
		justifyContent: 'center',
	},
	modalDraggable: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		borderRadius: 10,
		marginHorizontal: 10,
	},
	title: {
		color: colors.secondaryFont,
	},
	guideContainer: {
		paddingHorizontal: 20,
		marginTop: 20,
	},
	guideButton: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		paddingVertical: 12,
	},
	guideText: {
		marginLeft: 10,
		flex: 1,
		fontSize: 12,
	},
	icon: {
		fontSize: 25,
		color: colors.primary,
	},
	dot: { color: colors.medium, fontSize: 14 },
});
