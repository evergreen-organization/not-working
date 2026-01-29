import React, { useRef } from 'react';
import { View, useWindowDimensions } from 'react-native';

import { Text } from 'atoms';
import { Numpad } from 'molecules';

import { styles } from './styles';
export const PinInput = ({ value = '', onChange, errorTitle = '', title }) => {
	const { width, height } = useWindowDimensions();

	const handleViewRef = useRef();

	const handlePress = (digit, e) => {
		if (value.length < 6) {
			onChange(digit, e);
		}
	};

	const getPinStyles = (length) => ({
		width: width * 0.04,
		height: width * 0.04,
		borderRadius: width * 0.04 * 0.5,
		...styles.pin,
		...(value.length > length && styles.filledPin),
	});

	return (
		<View style={styles.container}>
			<View
				style={{
					...styles.titleContainer,
					marginBottom: height < 700 ? 20 : 40,
				}}
			>
				<View style={{ marginBottom: 15 }} ref={handleViewRef}>
					<Text variant={'h5'} style={styles.errorText}>
						{errorTitle ?? ' '}
					</Text>
					<Text variant={'H4'} style={styles.title}>
						{title}
					</Text>
				</View>
				<View style={styles.pinContainer}>
					<View style={getPinStyles(0)} />
					<View style={getPinStyles(1)} />
					<View style={getPinStyles(2)} />
					<View style={getPinStyles(3)} />
					<View style={getPinStyles(4)} />
					<View style={getPinStyles(5)} />
				</View>
			</View>
			<Numpad onPress={handlePress} />
		</View>
	);
};
