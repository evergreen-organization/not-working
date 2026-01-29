import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		marginHorizontal: width * 0.15,
	},
	template1: {
		flex: 0.78,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	template2: {
		flex: 0.78,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	template3: {
		flex: 0.78,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	template4: {
		flex: 0.45,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	template5: {
		flex: 0.45,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	greetText1: {},
	mainText1: {
		fontFamily: 'Piazzolla-ExtraBold',
		fontSize: 15,
		lineHeight: 30,
		color: '#ffffff',
		marginBottom: height * 0.07,
	},
	footerText1: {
		fontFamily: 'Amarante-Regular',
		lineHeight: 30,
		fontSize: 15,
		color: '#ffffff',
	},

	greetText2: {},
	mainText2: {
		fontFamily: 'Lora-Bold',
		fontSize: 16,
		lineHeight: 30,
		color: '#FFFFFF',
		paddingHorizontal: 10,
		marginBottom: height * 0.07,
	},
	footerText2: {
		fontFamily: 'Amarante-Regular',
		fontSize: 16,
		lineHeight: 30,
		color: '#FFFFFF',
		paddingHorizontal: 10,
	},

	greetText3: {
		fontFamily: 'Farro-Regular',
		color: '#FFFFFF',
		fontSize: 16,
		lineHeight: 30,
		marginBottom: height * 0.07,
	},
	mainText3: {
		fontFamily: 'Farro-Bold',
		fontSize: 16,
		lineHeight: 30,
		color: '#ffffff',
	},
	footerText3: {},

	greetText4: {},
	mainText4: {
		fontFamily: 'Piazzolla-ExtraBold',
		fontSize: 16,
		color: '#000000',
		lineHeight: 30,
		width: '90%',
	},
	footerText4: {
		color: '#ffffff',
		fontFamily: 'Amarante-Regular',
		fontSize: 16,
		marginTop: height * 0.02,
	},

	mainText5: {
		fontFamily: 'Farro-Bold',
		fontSize: 15,
		color: '#FFD1AF',
		lineHeight: 30,
		width: '90%',
	},
});

export default styles;
