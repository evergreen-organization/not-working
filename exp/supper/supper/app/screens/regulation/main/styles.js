import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	contentContainer: { flex: 1 },
	container: {
		backgroundColor: colors.white,
		paddingBottom: 12,
	},
	noticeContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	notice: {
		textAlign: 'center',
		fontSize: 14,
		marginVertical: 12,
	},
	imageContainer: {
		alignItems: 'center',
	},
	image: {
		width: 70,
		height: 70,
	},
	regulationFailedContainer: {
		height: 600,
		alignItems: 'center',
		justifyContent: 'center',
	},
	failText: { color: colors.oldLavender },
});
