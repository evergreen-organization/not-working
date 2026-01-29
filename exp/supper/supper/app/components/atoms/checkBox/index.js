import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { colors } from 'configs';
import TickIcon from 'assets/images/icon/check.png';

export const Checkbox = ({
	status = false,
	onPress,
	style,
	multiple = false,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[styles.btn, style]}
			onPress={onPress}
		>
			<View
				style={[
					styles.view,
					multiple && { borderRadius: 3 },
					status && { backgroundColor: colors.primary },
				]}
			>
				{status && (
					<Image
						source={TickIcon}
						style={{ width: 11, height: 11, tintColor: colors.white }}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		marginRight: 10,
	},
	view: {
		width: 16,
		height: 16,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
