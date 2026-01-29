import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from 'configs/colors';
import { AnimatedScaleView } from 'molecules';

export const TouchableCard = ({ onPress, style, children, testID }) => {
	return (
		<AnimatedScaleView testID={testID} onPress={onPress} containerStyle={[styles.container, style]}>
			{children}
		</AnimatedScaleView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 12,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 1,
	},
});

export default TouchableCard;
