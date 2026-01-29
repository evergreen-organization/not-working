import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		borderRadius: 20,
		marginTop: 50,
	},
	navbar: { marginTop: 5, marginRight: 15, alignItems: 'flex-end' },
	btnForget: { padding: 5 },
	lblForget: { fontSize: 14 },
	pinInputContainer: { flex: 1, justifyContent: 'center' },
	bottomButtonContainer: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	bottomLeftBtn: { flex: 1, alignItems: 'center' },
	bottomRightBtn: { flex: 1, alignItems: 'center' },
	bottomRightBtnView: {
		height: 40,
		justifyContent: 'center',
		marginVertical: 10,
	},
	bottomRightBtnLbl: { fontSize: 18, fontWeight: 'bold' },
});
