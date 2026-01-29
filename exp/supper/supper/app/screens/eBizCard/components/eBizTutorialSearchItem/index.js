import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';
import { colors } from 'configs';
import RightIcon from 'assets/icon/right.png';

export const EBizTutorialSearchItem = ({ description, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.vwLabel}>
				<Text>{description}</Text>
			</View>
			<Image source={RightIcon} style={styles.image} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 20,
		justifyContent: 'space-between',
		marginLeft: 20,
	},
	vwLabel: {
		flex: 1,
	},
	image: {
		width: 24,
		height: 24,
		marginLeft: 12,
		tintColor: colors.primary,
	},
});
