import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: { flex: 1 },
	manualContainer: {
		flex: 1,
		paddingHorizontal: 20,
	},
	rightIconContainer: {
		paddingLeft: 12,
	},
	rightIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: colors.white,
	},
	dropdownContainer: {
		flexDirection: 'row',
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		height: 45,
		borderRadius: 10,
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	icon: {
		width: 50,
		height: 50,
		tintColor: colors.primary,
	},
	seatingArrangementContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	seatingArrangementText: {
		marginBottom: 10,
	},
	notice: {
		color: colors.secondaryFont,
	},
	checkInBtnView: {
		marginVertical: 10,
		marginBottom: 20,
		alignItems: 'flex-end',
	},
	checkInBtn: { height: 40, paddingHorizontal: 8 },
	seatingView: { marginVertical: 20 },
	headerBtnView: {
		flexDirection: 'row',
		height: 35,
		marginHorizontal: 20,
		marginVertical: 12,
	},
	flex: { flex: 1 },
	marker: { borderColor: colors.white },
	camera: { height: '100%' },
});

export const getButtonStyle = (showColor) => {
	return {
		typography: 'P3',
		color: showColor ? colors.primary : colors.white,
		style: {
			...styles.tab,
			...(showColor && { backgroundColor: colors.primary }),
		},
		labelStyle: {
			...styles.tabText,
			...(!showColor ? { color: colors.black } : { color: colors.white }),
		},
	};
};
