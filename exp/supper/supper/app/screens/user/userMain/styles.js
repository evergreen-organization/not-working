import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY, showFestive } from 'constant';
import { FONT_FAMILY_BOLD } from 'styles/fonts';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	backgroundContainerADID: { flex: 0.8 },
	backgroundContainer: { flex: 1 },
	container: { flex: 1, backgroundColor: '#F5F5F5' },
	backgroundImage: { resizeMode: 'stretch' },
	topContainer: { flex: 1, alignItems: 'center', marginTop: StatusBar.currentHeight },
	avatarContainer: { marginTop: height * 0.02, flex: 1, alignItems: 'center' },
	name: {
		color: colors.black,
		textAlign: 'center',
		marginTop: 10,
	},
	id: {
		color: colors.black,
		textAlign: 'center',
		marginTop: 3,
	},
	bottomContainer: { flex: 1 },
	menuContainer: {
		marginHorizontal: 30,
		marginTop: 10,
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 30,
		opacity: showFestive ? E_FESTIVE_CARD_OPACTITY : 1,
	},
	buttonContainer: { marginVertical: 20 },
	logoutButton: {
		backgroundColor: colors.primary,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
	},
	logoutButtonContainer: {
		marginHorizontal: 30,
	},
	logoutButtonShadow: {
		borderRadius: 50,
	},
	festiveVdoBg: { position: 'absolute', width: '100%', height: '100%', zIndex: -2 },
});

export const festiveStyles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F5F5F5' },
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
	},
	topContainer: { flex: 1 },
	avatarContainer: { marginTop: 10, flex: 1 },
	name: {
		color: colors.black,
		textAlign: 'center',
	},
	id: {
		color: colors.black,
		textAlign: 'center',
		marginTop: 3,
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'space-between',
		marginTop: -150,
	},
	menuContainer: {
		marginHorizontal: 30,
		marginTop: 10,
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 70,
		opacity: showFestive ? E_FESTIVE_CARD_OPACTITY : 1,
	},
	buttonContainer: { marginBottom: 15 },
	cornerLeft: {
		width: 80,
		height: 80,
		position: 'absolute',
		alignSelf: 'flex-start',
		zIndex: 1,
		top: 0,
	},
	cornerRight: {
		width: 80,
		height: 80,
		position: 'absolute',
		alignSelf: 'flex-end',
		zIndex: 1,
		top: 0,
	},
	lantern1: {
		width: 100,
		height: 150,
		position: 'absolute',
		alignSelf: 'flex-end',
		zIndex: 1,
		top: 20,
	},
	lantern2: {
		width: 100,
		height: 150,
		position: 'absolute',
		alignSelf: 'flex-start',
		zIndex: 1,
		top: 0,
	},
	lantern3: {
		width: 50,
		height: 80,
		position: 'absolute',
		alignSelf: 'center',
		zIndex: 1,
		top: 0,
		left: 100,
	},
	lantern4: {
		width: 50,
		height: 80,
		position: 'absolute',
		alignSelf: 'center',
		zIndex: 1,
		top: 0,
		right: 100,
	},
	candleFrame: {
		position: 'absolute',
		width: width * 0.5,
		height: width * 0.5,
		alignSelf: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	avatar: { backgroundColor: colors.white, marginTop: 40, zIndex: -1 },
	loginButton: {
		marginBottom: 20,
		borderRadius: 10,
		width: 250,
		alignSelf: 'center',
	},
	logoutButtonShadow: {
		borderRadius: 10,
	},
	radius: { borderRadius: 10, overflow: 'hidden' },
	loginGif: { resizeMode: 'cover', width: 250, height: 40, borderRadius: 10 },
	logoutText: { fontSize: 14, color: colors.white, textAlign: 'center' },
	selfCenter: { alignSelf: 'center' },
	textContainer: {
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonLabel: {
		fontFamily: FONT_FAMILY_BOLD,
	},
});
