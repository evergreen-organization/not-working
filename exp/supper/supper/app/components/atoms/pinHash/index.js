import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export const PinHash = ({ pin }) => {
	return (
		<View style={styles.pinContainer}>
			<View style={[styles.pin, pin.length > 0 && styles.filledPin]} />
			<View style={[styles.pin, pin.length > 1 && styles.filledPin]} />
			<View style={[styles.pin, pin.length > 2 && styles.filledPin]} />
			<View style={[styles.pin, pin.length > 3 && styles.filledPin]} />
			<View style={[styles.pin, pin.length > 4 && styles.filledPin]} />
			<View style={[styles.pin, pin.length > 5 && styles.filledPin]} />
		</View>
	);
};
