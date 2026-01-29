import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from 'assets/icon/back-icon.png';

export const BackButton = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.goBack()}
			style={styles.headerBackTouch}
		>
			<Image source={BackIcon} style={styles.headerBackImage} />
		</TouchableOpacity>
	);
};

export default BackButton;

const styles = StyleSheet.create({
	headerBackTouch: {
		width: 38,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerBackImage: {
		tintColor: '#000',
		right: 3.5,
		width: 21,
		height: 21,
		resizeMode: 'contain',
	},
});
