import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: { flex: 1 },
	modalTopBar: {
		height: 44,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: '#DDDDDD',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: '#fff',
	},
	mapTopBar: {
		flex: 1,
		flexDirection: 'row',
		marginTop: Platform.OS === 'ios' ? 0 : 10,
	},
	calloutContainer: { width: '100%' },
	statusBarBackground: {
		backgroundColor: 'transparent',
	},
});
