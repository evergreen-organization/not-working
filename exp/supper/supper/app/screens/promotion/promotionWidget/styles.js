import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY, showFestive } from 'constant';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	festiveContainer: {
		opacity: E_FESTIVE_CARD_OPACTITY,
	},
	promoImage: {
		height: 100,
		flex: 1,
		resizeMode: 'contain',
		margin: 5,
	},
	promotionTitleContainer: {
		flex: 1,
		padding: 12,
	},
	promoTitle: {
		// fontSize: 11,
		marginBottom: 5,
		flex: 1,
	},
	promoText: { color: colors.black },

	promoDesc: {
		// fontSize: 11,
		color: colors.secondaryFont,
		letterSpacing: -0.2,
	},
	noticeContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
	},
	notice: {
		textAlign: 'center',
		// fontSize: 12,
		color: colors.secondaryFont,
		marginVertical: 12,
	},
	imageContainer: {
		alignItems: 'center',
		paddingTop: 12,
	},
	image: {
		width: 60,
		height: 60,
	},
	festiveIcon: {
		width: 30,
		height: 40,
	},
	shadow: {
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	promotionRows: { flexDirection: 'row', marginRight: -20 },
	promotionItem: { padding: 0, marginBottom: 20, marginRight: 20, flex: 1 },
	reachEnd: {
		color: colors.secondaryFont,
		textAlign: 'center',
	},
});
