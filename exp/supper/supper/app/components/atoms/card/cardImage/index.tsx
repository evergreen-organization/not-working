import React from 'react';
import {
	Image,
	ImageProps,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';

interface CardImageProps extends ImageProps {
	source: ImageSourcePropType;
	style?: StyleProp<ImageStyle>;
	containerStyle?: StyleProp<ViewStyle>;
}

export const CardImage = (props: CardImageProps) => {
	const { source, style, containerStyle } = props;
	return (
		<View style={[$container, containerStyle]}>
			<Image source={source} {...props} style={[$image, style]} />
		</View>
	);
};

CardImage.displayName = 'Card.Image';

const $container: ViewStyle = {
	overflow: 'hidden',
	height: 100,
};
const $image: ImageStyle = {
	flex: 1,
	height: undefined,
	width: undefined,
	justifyContent: 'flex-end',
};
