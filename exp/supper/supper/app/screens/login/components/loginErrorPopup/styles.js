import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: colors.babyPowder,
		width: '70%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		paddingHorizontal: '10%',
		paddingVertical: '10%',
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
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
	},
	modalText: {
		fontSize: 15,
		marginBottom: '5%',
	},
	modalButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: '80%',
		backgroundColor: colors.primary,
		borderRadius: 20,
		marginTop: '5%',
	},
	modalButtonText: {
		fontSize: 14,
		color: colors.white,
	},
});
