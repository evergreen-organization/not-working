import { Text } from 'atoms';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ButtonWithImage = ({
	title,
	image,
	onPress,
	style,
	imageStyle,
	textStyle,
	bold = true,
	...props
}) => {
	return (
		<TouchableOpacity style={style} onPress={onPress} {...props}>
			<Image source={image} style={imageStyle} />
			<Text bold={bold} style={textStyle}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default ButtonWithImage;
