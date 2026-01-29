import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	headerIconContainer: {
		padding: 6,
		paddingLeft: 10,
	},
	headerIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	background: {
		margin: 10,
		borderRadius: 10,
		paddingTop: 10,
		backgroundColor: colors.white,
		overflow: 'hidden',
	},
	descriptionStyle: {
		marginTop: 10,
	},
	listStyle: {
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	contentStyle: {
		marginLeft: 10,
	},
	tagView: {
		justifyContent: 'flex-end',
	},
	emptyView: {
		minHeight: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		fontSize: 25,
	},
});
