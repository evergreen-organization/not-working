import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	video: {
		width: width - 30,
		margin: 15,
		justifyContent: 'center',
		alignItems: 'center',
		aspectRatio: 65 / 32,
		borderRadius: 10,
		overflow: 'hidden',
	},
});

export default styles;
