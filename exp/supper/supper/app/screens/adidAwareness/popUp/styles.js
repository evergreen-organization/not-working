import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { screenHeight, screenWidth } from 'constant';

export const styles = StyleSheet.create({
	container: { flexDirection: 'row' },
	viewButton: { flex: 1 },
	background: {
		backgroundColor: colors.white,
		borderRadius: 10,
		width: screenWidth * 0.9,
		maxHeight: screenHeight * 0.9,
	},
	closeButtonView: {
		alignSelf: 'flex-end',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	previousButtonView: {
		alignSelf: 'flex-start',
		padding: 10,
		flexDirection: 'row',
	},
	ButtonView: {
		alignSelf: 'flex-end',
		padding: 10,
		flexDirection: 'row',
	},
	closeText: {
		fontSize: 13,
		color: colors.primary,
		marginRight: 8,
	},
	slideImage: {
		alignSelf: 'center',
		resizeMode: 'contain',
		width: screenWidth * 0.8,
		height: screenHeight * 0.3,
	},
	buttonView: {
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'center',
		marginBottom: 20,
		marginTop: 8,
		width: screenWidth * 0.8,
	},
	buttonTitle: {
		textAlign: 'center',
	},
	flex: {
		flex: 1,
	},
});
