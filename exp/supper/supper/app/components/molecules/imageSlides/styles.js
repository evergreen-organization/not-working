import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
	button: {
		width: windowWidth,
		height: '100%',
	},
	image: {
		flex: 1,
	},
});
