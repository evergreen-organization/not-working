import { useWindowDimensions, View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { skeletonColors } from 'configs';
import React from 'react';

export const NameCardSkeleton = ({ color }) => {
	const height = 40;
	const { width } = useWindowDimensions();
	const loaderWidth = width - 40;

	return (
		<View key={'hello'} style={{ alignSelf: 'center', marginTop: 12 }}>
			<ContentLoader
				width={loaderWidth}
				height={height}
				speed={1}
				backgroundColor={color ?? skeletonColors.bone}
				foregroundColor={skeletonColors.highlight}
			>
				<Rect x={0} y={0} rx="5" width="100%" height="40" />
			</ContentLoader>
		</View>
	);
};
