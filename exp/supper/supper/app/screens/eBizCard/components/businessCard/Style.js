'use strict';
import { colors } from 'configs';
import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
	section: {
		marginTop: 10,
		alignSelf: 'center',
	},
	card: {
		width: windowWidth * 0.89,
		height: undefined,
		aspectRatio: 1.75 / 1,
		padding: 20,
		borderWidth: 1,
		borderColor: '#f2f2f2',
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		rowGap: 24,
		paddingHorizontal: 58,
		paddingVertical: 58,
	},
	button: {
		backgroundColor: colors.primary,
		borderRadius: 6,
		shadowColor: colors.lightGrey,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		shadowOpacity: 0.6,
		shadowRadius: 10,
	},
	businessCardContainer: {
		marginTop: 10,
	},
	shareIcon: {
		height: 25,
		aspectRatio: 1,
		marginRight: 10,
	},
});
