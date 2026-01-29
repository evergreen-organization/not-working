import React from 'react';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { Text } from 'atoms';
import DeleteIcon from 'assets/icon/delete.png';

import { styles } from './styles';

const DELETE = 'del';
const numbers = (onDelete) => [
	{ key: 'row1', value: ['1', '2', '3'] },
	{ key: 'row2', value: ['4', '5', '6'] },
	{ key: 'row3', value: ['7', '8', '9'] },
	{ key: 'row4', value: ['', '0', onDelete ? DELETE : ''] },
];

export const Numpad = ({ onPress, onDelete, style, buttonStyle }) => {
	const window = useWindowDimensions();

	const buttonDimension = {
		width: window.width / 3.5,
	};

	const renderNumber = (number, index) => {
		if (!number) {
			return <View key={`${number}-${index}`} style={buttonDimension} />;
		}

		if (number === DELETE) {
			return (
				<TouchableOpacity
					key={number}
					onPress={onDelete}
					style={{ ...styles.btn, ...buttonDimension }}
				>
					<Image source={DeleteIcon} style={styles.icon} />
				</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity
				key={number}
				onPress={(e) => onPress(number, e)}
				style={StyleSheet.flatten([{ ...styles.btn, ...buttonDimension }, buttonStyle])}
			>
				<Text variant={'H4'} style={styles.btnText}>
					{number}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={[styles.container, style]}>
			{numbers(onDelete).map((row) => (
				<View style={styles.fill} key={row.key}>
					<View style={styles.rowContainer}>{row.value.map(renderNumber)}</View>
				</View>
			))}
		</View>
	);
};
