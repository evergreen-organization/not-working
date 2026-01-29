import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { PrimaryButton } from 'atoms';
import { colors } from 'configs';
import { initialBottom } from 'styles';

export interface IPrimaryBottomButton {
	onPress: () => {} | void;
	style?: StyleProp<ViewStyle>;
	disabled: boolean;
	testID?: string;
	title: string;
	isTitleBold?: boolean;
}

const PrimaryBottomButton = ({
	onPress,
	style,
	disabled,
	testID,
	title,
	isTitleBold,
}: IPrimaryBottomButton) => {
	return (
		<View style={StyleSheet.flatten([styles.container, style])}>
			<PrimaryButton
				title={title}
				testID={testID}
				disabled={disabled}
				fill={false}
				onPress={onPress}
				isTitleBold={isTitleBold}
			/>

			<View style={{ height: initialBottom + 20 }} />
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
		paddingHorizontal: 30,
		paddingTop: 10,
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

export default PrimaryBottomButton;
