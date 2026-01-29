import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useWindowDimensions, View } from 'react-native';

import { skeletonColors } from 'configs';

export const SkeletonProspectList = ({ loop, color }) => {
	const height = 40;
	const { width } = useWindowDimensions();
	const loaderWidth = width - 40;
	const list = Array.from(Array(loop).keys());

	return list.map((item) => (
		<View key={item} style={{ alignSelf: 'center', marginTop: 12 }}>
			<ContentLoader
				width={loaderWidth}
				height={height}
				speed={1}
				backgroundColor={color ? color : skeletonColors.bone}
				foregroundColor={skeletonColors.highlight}
			>
				<Rect x={0} y={0} rx="5" width="100%" height="40" />
			</ContentLoader>
		</View>
	));
};
