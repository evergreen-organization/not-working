import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	header: { marginHorizontal: 25, marginTop: 20 },
	lottieView: { marginTop: -20, aspectRatio: 1, width: '100%' },
	bottomView: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		gap: 20,
	},
	skipTitleStyle: {
		backgroundColor: colors.medium,
		color: colors.primaryFont,
	},
	skipButton: { backgroundColor: colors.medium },
});

export default styles;
