import { Platform } from 'react-native';

const fontFamily = 'Montserrat-Regular';
const fontFamilyBold = 'Montserrat-Bold';

const configureFonts = (config) => Platform.select({ ...config });

const font = {
	ios: {
		regular: {
			fontFamily: fontFamily,
		},
	},
	android: {
		regular: {
			fontFamily: fontFamily,
		},
	},
};

const theme = {
	colors: {
		primary: '#333', //9383e3 on icons 8272D1
	},
	fonts: configureFonts(font),
};

export default {
	fontFamily,
	fontFamilyBold,
	theme,
};
