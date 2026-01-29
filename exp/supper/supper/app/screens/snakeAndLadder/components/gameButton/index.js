import React from 'react';
import { Text } from 'atoms';
import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export const GameButton = ({ text, bgImage, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<ImageBackground
				source={bgImage}
				style={styles.button}
				resizeMode="fill"
				imageStyle={styles.image}
			>
				<Text as={Text.type.H2} bold>
					{text}
				</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 100,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		borderRadius: 10,
	},
});
