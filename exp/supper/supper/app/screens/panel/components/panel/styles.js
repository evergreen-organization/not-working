import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
export const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: CARD_WIDTH,
		backgroundColor: colors.white,
		marginLeft: 10,
		marginBottom: 10,
		borderRadius: 8,
		paddingHorizontal: 12,
		shadowColor: '#606060',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	cardImage: {
		width: 60,
		height: 55,
		alignSelf: 'flex-end',
		borderRadius: 8,
		marginBottom: -30,
		right: 10,
		zIndex: 1,
	},
	cardtitle: {
		// fontSize: RFValue(13, 812),
		color: colors.primaryFont,
		paddingTop: 12,
	},
	cardDescription: {
		// fontSize: RFValue(13, 812),
		color: colors.secondaryFont,
	},
	cardDistance: {
		fontSize: 20,
		color: colors.primaryFont,
		fontWeight: 'bold',
	},
	cardKm: {
		color: colors.secondaryFont,
		textAlign: 'center',
	},
	cardButton: {
		width: 42,
		height: 42,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary,
		borderRadius: 50,
		marginLeft: '2%',
	},
	cardButtonIcon: {
		fontSize: 18,
		color: colors.white,
	},
	section: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingVertical: 10,
	},
});
