import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';
import { RFValue } from 'react-native-responsive-fontsize';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.babyPowder,
	},
	loginFormContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40 + initialWindowMetrics?.insets.bottom,
		gap: 20,
	},
	icon: {
		tintColor: colors.white,
		marginRight: 8,
	},
	signInBtn: {
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		width: 55,
		height: 55,
		borderRadius: 50,
	},
	devLabel: {
		color: colors.primary,
		opacity: 0.5,
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(14, 812),
	},
	appName: {
		fontSize: 15,
		color: colors.white,
		fontFamily: 'Montserrat-Bold',
	},
	versionContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		alignSelf: 'center',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	radius: {
		borderRadius: 10,
		overflow: 'hidden',
		marginHorizontal: 10,
		alignItems: 'center',
	},
	loginButton: {
		marginBottom: 60,
	},
	loginGif: {
		resizeMode: 'cover',
		height: 38,
		borderRadius: 10,
	},
	appLogo: {
		width: 120,
		height: 120,
		borderRadius: 10,
	},
	rotationGestureContainer: {
		width: windowWidth,
		height: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	sloganContainer: {
		top: -(windowWidth / 2) + 80,
		zIndex: 0,
	},
	title1: {
		fontSize: 16,
		marginTop: 10,
		fontStyle: 'italic',
		color: colors.white,
	},
	title2: {
		fontSize: 14,
		marginTop: 10,
		fontStyle: 'italic',
		color: colors.white,
	},
	formView: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center',
		marginTop: 60,
	},
	loginText: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 16,
	},

	appLogo2: {
		width: 50,
		height: 50,
		marginHorizontal: 10,
		borderRadius: 5,
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginIcon: {
		width: 20,
		height: 20,
		tintColor: colors.white,
		marginRight: 8,
	},
	bottomGradientView: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		zIndex: -1,
	},
	// Festive css
	logoContainerFestive: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	festiveFormView: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center',
	},
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flex: 1,
		alignItems: 'flex-end',
	},
	//unused
	festiveLottie: {
		alignSelf: 'center',
		width: windowWidth * 0.65,
		position: 'absolute',
		zIndex: -1,
		opacity: 0.8,
		bottom: 0,
		left: -5,
	},
	festiveBg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
		zIndex: -2,
	},
	festiveDevLabel: {
		color: colors.white,
		fontFamily: 'Montserrat-Bold',
		fontSize: RFValue(14, 812),
	},
	festiveText: {
		width: 350,
		height: 180,
		zIndex: 1,
		alignSelf: 'flex-start',
		justifyContent: 'center',
		top: windowHeight * 0.1,
		left: windowWidth * 0.01,
	},
	versionLbl: { justifyContent: 'center' },
	versionNameFestive: {
		fontSize: 14,
		color: colors.white,
	},
	appLogoFestive: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	logoText: {
		fontSize: 18,
		color: colors.white,
		marginTop: 10,
	},

	versionView: {
		marginLeft: 10,
	},
	mfaButtonView: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 10,
		marginHorizontal: 10,
	},
	fill: {
		flex: 1,
	},
});
