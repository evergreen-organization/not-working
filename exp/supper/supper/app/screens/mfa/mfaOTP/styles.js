import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.8,
	},
	lottieIcon: {
		width: 120,
		height: 120,
	},
	lblTitle: {
		marginVertical: 15,
	},
	OTPContainer: {
		flexDirection: 'row',
		padding: 20,
		marginHorizontal: 60,
		borderRadius: 5,
		borderColor: colors.shadow,
		backgroundColor: colors.medium,
	},
	lblOTP: {
		flex: 1,
		textAlign: 'center',
	},
	lblCounter: {
		marginVertical: 15,
	},
	lblError: {
		marginVertical: 15,
	},
	btnRefresh: {
		position: 'absolute',
		bottom: 80,
		marginHorizontal: 40,
		marginTop: 40,
		flexDirection: 'row',
		backgroundColor: colors.primary,
		padding: 12,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	lblRefresh: {
		flex: 1,
		textAlign: 'center',
		color: colors.white,
	},
});
