import { StyleSheet } from 'react-native';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR } from './fonts';
import { colors } from 'configs';

export const Typography = StyleSheet.create({
	base: { color: colors.black, fontSize: 12 },
	H1: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 40,
		lineHeight: 41,
	},
	H2: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 28,
		lineHeight: 33,
	},
	H3: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 25,
		lineHeight: 30,
		marginBottom: 10,
	},
	H4: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 20,
		lineHeight: 30,
	},
	H5: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 18,
		lineHeight: 22,
		color: colors.medium,
	},
	H6: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 16,
		lineHeight: 19,
	},
	H7: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 40,
	},
	P1: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 15,
	},
	P2: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 15,
		lineHeight: 20,
	},
	P3: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 13,
	},
	P4: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 13,
	},
	P5: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 11,
	},
	P6: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 14,
	},
	P7: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 14,
	},
	P8: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 11,
	},
	P9: {
		fontFamily: FONT_FAMILY_BOLD,
		fontSize: 12,
	},
	P10: {
		fontFamily: FONT_FAMILY_REGULAR,
		fontSize: 12,
	},
});
