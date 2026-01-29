import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY } from 'constant';

export const styles = StyleSheet.create({
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
		opacity: 0.1,
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
	},
	noMeetingText: {
		paddingTop: 10,
		fontSize: 12,
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
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
	},
	noMeetingText: {
		paddingTop: 10,
		fontSize: 12,
	},
	festiveImage: {
		width: 33,
		height: 33,
		right: 2,
		position: 'absolute',
		zIndex: -2,
		bottom: 0,
	},
	festiveImage2: {
		width: 30,
		height: 30,
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0,
		right: 32,
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
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
	},
	noMeetingText: {
		paddingTop: 10,
		fontSize: 12,
	},
	festiveImage: {
		width: '20%',
		height: undefined,
		aspectRatio: 1,
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 2,
		right: 2,
	},
});
