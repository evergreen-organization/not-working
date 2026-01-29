import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon, Text } from 'atoms';
import { colors } from 'configs';

import { styles } from './styles';

export const FormFieldView = ({
	testID,
	disabled,
	onPress,
	showValue,
	displayValue,
	placeHolder = 'Tap to input',
	textInputStyle,
}) => {
	return (
		<TouchableOpacity testID={testID} disabled={disabled} onPress={onPress}>
			<View style={{ ...styles.textInput, ...textInputStyle }}>
				<Text
					variant={'P6'}
					style={{
						...styles.text,
						color: showValue ? colors.black : colors.secondaryFont,
					}}
				>
					{showValue ? displayValue : placeHolder}
				</Text>
				<Icon type={'material'} name={'keyboard-arrow-down'} style={styles.icon} />
			</View>
		</TouchableOpacity>
	);
};
