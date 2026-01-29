import { colors } from 'configs';
import { StyleSheet } from 'react-native';
import { initialBottom, initialTop } from 'styles';

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden',
		justifyContent: 'flex-end',
		paddingBottom: initialBottom,
	},
	divider: {
		borderTopWidth: 1,
		borderTopColor: colors.border,
	},
	cancelContainer: {
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	cancelText: {
		fontSize: 15,
	},
	confirmText: {
		fontSize: 15,
		color: colors.primary,
	},
	baseModal: {
		paddingTop: initialTop,
	},
});

export default styles;
