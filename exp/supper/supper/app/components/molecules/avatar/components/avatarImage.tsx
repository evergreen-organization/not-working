import React from 'react';
import { Image, ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';

export interface AvatarImageProps {
	size: number;
	rounded?: boolean;
	source: ImageSourcePropType;
	style?: StyleProp<any>;
}

export const AvatarImage = (props: AvatarImageProps) => {
	const { size, rounded, source, style } = props;
	const borderRadius = size / 2;

	return (
		<View style={[{ ...(rounded && { borderRadius: borderRadius }) }, $imageContainer]}>
			<Image
				source={source}
				resizeMode={'cover'}
				style={{
					width: size,
					flex: 1,
					...style,
				}}
			/>
		</View>
	);
};

const $imageContainer: ViewStyle = {
	overflow: 'hidden',
	justifyContent: 'center',
	alignItems: 'center',
};
