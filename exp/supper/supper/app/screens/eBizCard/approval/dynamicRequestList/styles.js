import { colors } from 'configs';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
	},
	sectionList: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: colors.background,
	},
	selectionButton: {
		backgroundColor: colors.white,
		marginTop: 12,
		borderRadius: 6,
		flexDirection: 'row',

		shadowColor: colors.lightGrey,
		shadowOpacity: 0.6,
		shadowRadius: 10,
	},

	selectionLabel: {
		marginLeft: 15,
	},
	buttonContainer: {
		flexDirection: 'row',
		margin: 10,
		marginBottom: 0,
	},
	button: {
		flex: 1,
		borderRadius: 6,
		padding: 12,
	},
	buttonIcon: {
		marginRight: 5,
		height: 24,
		width: 24,
	},
	buttonText: {
		color: colors.white,
		fontSize: 14,
		fontFamily: 'Montserrat-Bold',
		marginHorizontal: 8,
	},

	buttonTittle: {
		fontSize: 15,
		fontWeight: 'bold',

		color: colors.white,
	},
	bottomView: {
		backgroundColor: colors.iconBackground,
		borderTopWidth: 0.23,
		borderTopColor: '#D8D8D8',
	},
	searchBar: {
		marginBottom: 20,
	},

	textTitle: {
		color: '#000',
		fontSize: 14,
		fontWeight: 600,
		textAlign: 'left',
	},
});
