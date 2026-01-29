import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: colors.babyPowder,
		width: '90%',
		justifyContent: 'center',
		alignSelf: 'center',
		paddingHorizontal: 30,
		paddingVertical: 30,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalTitle: {
		textAlign: 'center',
	},
	modalText: {
		marginTop: 10,
		marginBottom: '5%',
		textAlign: 'center',
	},
	confirmButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 100,
		// width: '80%',
		backgroundColor: colors.primary,
		borderRadius: 10,
		marginTop: '5%',
	},
	backButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 80,
		// width: '80%',
		backgroundColor: colors.white,
		borderColor: colors.secondaryFont,
		borderWidth: 1,
		borderRadius: 10,
		marginTop: '5%',
	},
	modalButtonText: {
		color: colors.white,
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	cancelButtonText: { color: colors.secondaryFont },
	closeIcon: {
		width: 15,
		height: 15,
		tintColor: colors.secondaryFont,
		alignSelf: 'flex-end',
	},
	icon: {
		width: 120,
		height: 120,
		alignSelf: 'center',
		marginBottom: 20,
	},
});
