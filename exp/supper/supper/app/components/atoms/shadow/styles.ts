import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	...Platform.select({
		ios: {
			shadow: {
				shadowOffset: { width: -2, height: 4 },
				shadowColor: '#171717',
				shadowOpacity: 0.2,
				shadowRadius: 3,
			},
		},
		android: {
			shadow: {
				shadowColor: '#171717',
				shadowOffset: { width: 1, height: 1 },
				shadowOpacity: 0.05,
				shadowRadius: 10,
			},
		},
	}),
});

export default styles;
