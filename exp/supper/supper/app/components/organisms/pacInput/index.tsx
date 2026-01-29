import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { colors } from 'configs';
import { Numpad } from 'molecules';
import { TextInput } from 'organisms';
import { Text } from 'atoms';

const PacInput = ({ value = '', onChange, errorTitle = '' }) => {
	const { width } = useWindowDimensions();

	const pacRef = useRef();

	useEffect(() => {
		pacRef.current.focus();
	}, []);

	const handlePress = (digit) => {
		if (value.length < 6) {
			onChange(digit);
		}
	};

	const handleDelete = () => onChange(value.slice(0, -1));

	return (
		<View style={styles.container}>
			<View style={{ paddingTop: width > 500 ? 8 : '6%' }}>
				<Text style={styles.errorText}>{errorTitle || ' '}</Text>
			</View>
			<View style={{ paddingHorizontal: 25, marginBottom: width > 500 ? 0 : '8%' }}>
				<TextInput
					testID={'pac-input'}
					ref={pacRef}
					bold
					editable={Platform.OS !== 'android'}
					onChangeText={(text) => onChange(text)}
					value={value}
					maxLength={6}
					style={{ flex: 0, fontSize: 28, color: colors.black, height: 55 }}
					placeholderTextColor={colors.lightGrey}
					placeholder={'000000'}
					keyboardType={'number-pad'}
					textContentType={'oneTimeCode'}
				/>
			</View>
			{Platform.OS === 'android' ? (
				<Numpad onPress={(text) => handlePress(value + text)} onDelete={handleDelete} />
			) : (
				<View style={{ flex: 1 }} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		paddingTop: 8,
	},
	errorText: {
		fontSize: 13,
		color: colors.red,
		marginHorizontal: 25,
	},
});

export default PacInput;
