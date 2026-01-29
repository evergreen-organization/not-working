import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY } from 'constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	shadow: {
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
		elevation: 1,
	},
	rayaModalContainer: {},
	quickLinksContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		marginBottom: 20,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
		overflow: 'hidden',
	},
	quickLinks: {
		flexDirection: 'row',
	},
	headingContainer: {
		paddingHorizontal: 15,
		paddingTop: 10,
	},
	heading: {
		marginVertical: 10,
	},
	volumeButton: {
		position: 'absolute',
		right: 20,
		bottom: 10,
		zIndex: 1,
		opacity: 0.5,
	},
	volumeIcon: {
		width: 30,
		height: 30,
	},
	candleIcon: {
		zIndex: 1,
		position: 'absolute',
		width: 80,
		height: 80,
		alignSelf: 'flex-end',
		bottom: 0,
	},
	shareSectionHeader: {
		flexDirection: 'row',
		// backgroundColor: '#000',
		alignItems: 'center',
	},
});

export const festiveStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	festiveContainer: {
		flex: 1,
	},
	shadow: {
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
		elevation: 1,
	},
	rayaModalContainer: {},
	festiveQuickLinkContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		marginBottom: 20,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
		overflow: 'hidden',
		opacity: E_FESTIVE_CARD_OPACTITY,
	},
	quickLinksContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		marginBottom: 20,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
		overflow: 'hidden',
	},
	quickLinks: {
		flexDirection: 'row',
	},
	headingContainer: {
		paddingHorizontal: 15,
	},
	heading: {
		marginVertical: 10,
		color: colors.black,
	},
	festiveBg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
		// resizeMode: 'stretch',
	},
	volumeButton: {
		position: 'absolute',
		right: 20,
		bottom: 10,
		zIndex: 1,
		opacity: 0.5,
	},
	volumeIcon: {
		width: 30,
		height: 30,
	},
	candleIcon: {
		zIndex: 1,
		position: 'absolute',
		width: 80,
		height: 80,
		alignSelf: 'flex-end',
		bottom: 0,
	},
	snowContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	snow: { height: '100%', width: '100%' },
	fab: {
		position: 'absolute',
		margin: 10,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		backgroundColor: colors.white,
		borderRadius: 200,
		shadowColor: colors.primaryFont,
		shadowOffset: { width: 2, height: 3 },
		shadowOpacity: 0.7,
		shadowRadius: 2,
		elevation: 0.5,
		opacity: 1,
		resizeMode: 'contain',
		paddingTop: 7,
	},
	fortuneCookies: {
		height: 60,
		width: undefined,
		aspectRatio: 1,
		resizeMode: 'contain',
	},
	tapMeText: {
		textAlign: 'center',
		marginTop: -7,
	},
});
