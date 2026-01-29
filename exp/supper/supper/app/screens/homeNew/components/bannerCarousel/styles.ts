import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		overflow: 'hidden',
		marginTop: 10,
		paddingRight: 30,
	},
	itemContainer: {
		paddingHorizontal: 15,
		paddingBottom: 5,
	},
	bannerItem: {
		borderRadius: 10,
		aspectRatio: 65 / 32,
		height: 'auto',
		margin: 15,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dotStyle: {
		// backgroundColor: colors.primary,
	},
});

export default styles;
