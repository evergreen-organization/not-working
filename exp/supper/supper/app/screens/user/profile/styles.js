import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { E_FESTIVE_CARD_OPACTITY } from 'constant';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatarContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		backgroundColor: colors.white,
		paddingBottom: 12,
		borderRadius: 10,
		margin: 20,
		marginVertical: 40,
		opacity: E_FESTIVE_CARD_OPACTITY,
	},
	nameText: {
		color: colors.primaryFont,
		textAlign: 'center',
	},
	festiveNameText: {
		color: colors.black,
		textAlign: 'center',
	},
	festiveBg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 1,
	},
});
