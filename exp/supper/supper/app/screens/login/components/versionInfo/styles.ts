import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	versionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
		height: 20,
	},

	appName: {
		fontSize: 12,
		color: colors.white,
		fontWeight: 'bold',
	},
	versionName: {
		fontSize: 12,
		color: colors.white,
		fontWeight: 'bold',
	},
	bottomGradientView: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		zIndex: -1,
	},
});

export default styles;
