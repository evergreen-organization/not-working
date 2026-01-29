import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	popupContainer: {
		paddingHorizontal: 0,
		paddingBottom: 0,
		overflow: 'hidden',
	},
	container: {
		backgroundColor: '#F4F4F4',
		paddingBottom: 30,
	},
	navBar: {
		height: 56,
		backgroundColor: colors.white,
		flexDirection: 'row',
		paddingHorizontal: 24,
		alignItems: 'center',
	},
	heading: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	closeButton: {
		height: 32,
		width: 32,
	},
	scrollView: {
		paddingHorizontal: 24,
		paddingBottom: 20,
	},
	spacing: {
		height: 30,
	},
	button: {
		marginTop: 15,
	},
	buttonText: {
		color: colors.white,
		fontSize: 14,
		fontFamily: 'Montserrat-Bold',
	},
	acceptButton: {
		backgroundColor: colors.green,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	declineButton: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	buttonIcon: {
		tintColor: colors.white,
		marginRight: 10,
	},
});
