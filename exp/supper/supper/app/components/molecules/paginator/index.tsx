import React from 'react';
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import PaginatorDot from '../paginatorDot';

export const Paginator = ({
	data = [],
	scrollX,
	widthRatio = null,
	style,
	dotStyle,
	dotWidth,
}: {
	data: any[];
	scrollX: SharedValue<number>;
	widthRatio?: number | null;
	style?: StyleProp<ViewStyle>;
	dotStyle?: StyleProp<ViewStyle>;
	dotWidth?: number[];
}) => {
	const { width } = useWindowDimensions();
	const currentWidth = widthRatio ? width * widthRatio : width;

	return (
		<View
			style={[
				styles.container,
				{
					marginTop: width * 0.03,
				},
				style,
			]}
		>
			{data.map((item, index) => {
				return (
					<PaginatorDot
						key={item?.id || `${index}-${new Date().getTime()}`}
						currentWidth={currentWidth}
						index={index}
						scrollX={scrollX}
						dotStyle={dotStyle}
						dotWidth={dotWidth}
					/>
				);
			})}
		</View>
	);
};

export default Paginator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignSelf: 'center',
		gap: 16,
	},
});
