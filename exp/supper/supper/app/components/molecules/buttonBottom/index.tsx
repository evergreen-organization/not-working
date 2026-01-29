import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'atoms';
import { colors } from 'configs';
import AnimatedScaleView from '../animatedScaleView';

export interface IButtonBottom {
	children: string;
	onPress: () => {} | void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	testID?: string;
}

const ButtonBottom = ({ children, onPress, style, disabled, testID }: IButtonBottom) => {
	const insets = useSafeAreaInsets();
	const gap = insets.bottom < 10 ? 10 : insets.bottom;

	return (
		<View style={StyleSheet.flatten([styles.container, style])}>
			<AnimatedScaleView
				testID={testID}
				disabled={disabled}
				containerStyle={[
					styles.button,
					{ ...(disabled && { backgroundColor: colors.medium }) },
					style,
				]}
				onPress={onPress}
			>
				<Text bold style={styles.label}>
					{children}
				</Text>
			</AnimatedScaleView>
			<View style={{ height: gap }} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderTopWidth: 0.33,
		borderTopColor: '#D8D8D8',
		zIndex: 1,
		shadowColor: colors.black,
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		backgroundColor: colors.primary,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		height: 45,
		marginHorizontal: 30,
		marginTop: 10,
	},
	label: {
		fontSize: 15,
		color: colors.white,
	},
});

export default ButtonBottom;
