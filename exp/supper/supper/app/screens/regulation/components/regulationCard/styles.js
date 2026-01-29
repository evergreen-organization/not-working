import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	button: {
		marginHorizontal: 20,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	image: {
		height: 140,
		width: '100%',
		resizeMode: 'cover',
		borderRadius: 10,
	},
	title: {
		marginTop: 10,
		marginBottom: 5,
	},
	desc: {
		color: colors.secondaryFont,
	},
	countContainer: {
		backgroundColor: 'rgba(196,58,64,0.9)',
		position: 'absolute',
		bottom: 10,
		right: 10,
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
	count: {
		fontFamily: 'Montserrat-Italic',
		color: colors.white,
	},
});
