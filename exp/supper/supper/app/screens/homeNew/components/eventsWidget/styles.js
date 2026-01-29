import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY } from 'constant';

export const styles = StyleSheet.create({
	label: {
		marginBottom: 10,
	},
	lblEmpty: {
		paddingTop: 10,
		fontSize: 12,
	},
	festiveIcon: {
		width: 50,
		height: 50,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 2,
	},
});

export const festiveStyles = StyleSheet.create({
	label: {
		marginBottom: 10,
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
	lblEmpty: {
		paddingVertical: 10,
		fontSize: 12,
	},
	festiveIcon: {
		width: 50,
		height: 50,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 2,
	},
	festiveImage: {
		height: 33,
		width: 33,
		aspectRatio: 1,
		position: 'absolute',
		right: 5,
		bottom: 0,
	},
	festiveImage2: {
		width: undefined,
		height: '65%',
		aspectRatio: 0.7,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 5,
		right: 42,
	},
});

export const festiveStyles2 = StyleSheet.create({
	label: {
		marginBottom: 10,
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
	lblEmpty: {
		paddingVertical: 10,
		fontSize: 12,
	},
	festiveIcon: {
		width: 50,
		height: 50,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 2,
	},
	festiveImage: {
		width: '23%',
		height: undefined,
		aspectRatio: 1.1,
		alignSelf: 'flex-end',
		position: 'absolute',
		top: 0,
	},
});
