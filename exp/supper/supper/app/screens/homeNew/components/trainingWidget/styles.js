import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY } from 'constant';

export const styles = StyleSheet.create({
	card: {
		overflow: 'hidden',
		shadowColor: colors.black,
		shadowOffset: { width: -5, height: 6 },
		shadowOpacity: 0.65,
		shadowRadius: 10,
		elevation: 1,
		opacity: 1,
	},
	label: {
		marginBottom: 10,
	},
	divider: {
		borderTopWidth: 1,
		borderTopColor: colors.primary,
	},
	trainingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: -12,
		zIndex: 1,
	},
});

export const festiveStyles = StyleSheet.create({
	festiveImage: {
		width: 33,
		height: 33,
		right: 0,
	},
	card: {
		overflow: 'hidden',
		shadowColor: colors.black,
		shadowOffset: { width: -5, height: 6 },
		shadowOpacity: 0.65,
		shadowRadius: 10,
		elevation: 1,
		opacity: E_FESTIVE_CARD_OPACTITY,
		paddingTop: 5,
	},
	divider: {
		borderTopWidth: 1,
		borderTopColor: colors.primary,
	},
});

export const festiveStyles2 = StyleSheet.create({
	festiveImage: {
		width: undefined,
		height: '40%',
		aspectRatio: 1.5,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 10,
	},
	card: {
		overflow: 'hidden',
		shadowColor: colors.black,
		shadowOffset: { width: -5, height: 6 },
		shadowOpacity: 0.65,
		shadowRadius: 10,
		elevation: 1,
		opacity: E_FESTIVE_CARD_OPACTITY,
	},
});
