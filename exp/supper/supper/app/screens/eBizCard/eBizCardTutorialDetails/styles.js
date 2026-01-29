import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	lblHeading: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.primary,
		marginTop: 12,
	},
	lblHeading2: {
		fontSize: 14,
		fontWeight: 'bold',
		color: colors.primaryFont,
		marginTop: 12,
	},
	lblDescription: {
		fontSize: 12,
		color: colors.primaryFont,
	},
	image: {
		marginTop: 12,
		resizeMode: 'contain',
	},
	vwNumberList: {
		flexDirection: 'row',
		marginTop: 8,
	},
	vwNumber: {
		height: undefined,
		width: 30,
		alignItems: 'center',
		marginRight: 4,
	},
	vwNumberText: {
		flex: 1,
	},
	lblNumber: {
		fontSize: 12,
	},
	vwCharacterList: {
		flexDirection: 'row',
		marginTop: 8,
		marginLeft: 24,
	},
	vwCaption: {
		marginTop: 24,
	},
	lblCaption: {
		fontSize: 10,
		fontStyle: 'italic',
		fontWeight: 'bold',
	},
	vwTags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	btnTags: {
		marginTop: 8,
		backgroundColor: '#D7D7D7',
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 4,
		marginRight: 8,
	},
	lblTag: {
		fontSize: 10,
	},
	vwRomansList: {
		flexDirection: 'row',
		marginTop: 8,
		marginLeft: 46,
	},
	vwRomans: {
		height: undefined,
		width: 30,
		alignItems: 'center',
		marginRight: 4,
	},
	vwRomansText: {
		flex: 1,
	},
	lblRomans: {
		fontSize: 12,
	},
});
