import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(245,245,245,0.4)',
		zIndex: 1,
		position: 'absolute',
	},
	indicatorContainer: {
		width: 55,
		height: 55,
		borderRadius: 15,
		paddingLeft: 2.5,
		paddingTop: 2.5,
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 44,
	},
	labelBox: {
		position: 'absolute',
		bottom: 140,
		padding: 8,
		alignItems: 'flex-end',
		borderRadius: 10,
		backgroundColor: 'rgba(240,240,240,0.6)',
	},
	loadLabel: {
		color: colors.secondaryFont,
	},
	gifView: { width: '100%', alignItems: 'center' },
	gifImage: { width: 80, height: 40 },
});

export default styles;
