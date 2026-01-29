import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	inputContainer: {
		backgroundColor: colors.background,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		justifyContent: 'center',
		marginTop: 7,
	},
	prefixContainer: {
		zIndex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		height: 30,
		width: 30,
		marginLeft: 10,
	},
	prefix: {
		marginLeft: -40,
		paddingLeft: 40,
		paddingHorizontal: 10,
		paddingVertical: 12,
		width: '100%',
	},
	input: {
		fontSize: 14,
		paddingHorizontal: 5,
		paddingVertical: 12,
		color: colors.primaryFont,
	},
	prefixView: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
});
