import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { Icon } from 'atoms';
import AnimatedScaleView from 'components/molecules/animatedScaleView';

export const HeaderIcon = ({ testID, type, name, onPress, style }) => {
	return (
		<AnimatedScaleView testID={testID} style={styles.sideButtonContainer} onPress={onPress}>
			<Icon name={name} type={type} style={StyleSheet.flatten([styles.icon, style])} />
		</AnimatedScaleView>
	);
};

const styles = StyleSheet.create({
	icon: {
		fontSize: 20,
		color: colors.primary,
		paddingHorizontal: 15,
		paddingVertical: 10,
		padding: 6,
	},
	sideButtonContainer: {
		width: 50,
	},
});
