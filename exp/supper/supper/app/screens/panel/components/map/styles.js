import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	ownMarkerWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: 'rgba(0,0,0, 0.2)',
		borderWidth: 1,
		borderColor: 'rgba(0,0,0, 0.3)',
	},
	marker: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#000',
	},
});
