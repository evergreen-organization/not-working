import { Text } from 'atoms';
import React from 'react';
import { View, StyleSheet } from 'react-native';
export const NameCardDetail = ({ fontSize, lines, children, icon }) => {
	return (
		<View style={styles.container}>
			{icon}
			<Text
				style={{ fontSize }}
				onTextLayout={(event) => {
					lines.current = event.nativeEvent.lines.length;
				}}
			>
				{children}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	icon: {
		marginRight: 4,
		resizeMode: 'contain',
	},
});
