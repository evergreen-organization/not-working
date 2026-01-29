import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: { flex: 1 },
	listContainer: {
		backgroundColor: colors.white,
	},
	headerIconContainer: {
		padding: 6,
		paddingLeft: 10,
	},
	headerIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	record: {
		marginHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	desc: {
		fontSize: 12,
		color: colors.secondaryFont,
	},
	tags: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		marginTop: 5,
		backgroundColor: colors.medium,
	},
	tagsText: {
		color: colors.primaryFont,
		fontSize: 11,
	},
	eventButton: {
		width: 55,
		height: 55,
		borderRadius: 15,
		backgroundColor: '#A1A1A1',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		marginBottom: 5,
		textDecorationLine: 'underline',
	},
	subTitle: {
		marginBottom: 5,
	},
	maskIcon: {
		width: 100,
		height: 100,
	},
	textContainer: {
		width: '60%',
		marginVertical: 10,
	},
	paragraph: {
		textAlign: 'center',
		fontSize: 14,
	},
	emptyViewContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addIcon: {
		width: 40,
		height: 40,
		borderWidth: 0.5,
		borderStyle: 'dashed',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
