import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 60,
	},
	popup: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: colors.white,
		alignItems: 'center',
	},
	text: {
		marginTop: 10,
		textAlign: 'center',
	},
	result: {
		marginTop: 20,
		textAlign: 'center',
	},
	img: {
		width: 70,
		height: 70,
		marginBottom: 10,
	},
	btn: {
		padding: 10,
		marginTop: 30,
		borderRadius: 8,
		backgroundColor: colors.pbxAltGrad1,
	},
});
