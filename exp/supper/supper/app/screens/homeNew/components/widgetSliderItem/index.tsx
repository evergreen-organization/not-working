import React, { memo } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Text, TextMarker } from 'atoms';
import styles from './styles';
import { isIos } from 'constant';
import { commonStyles } from 'styles';

interface ISliderItem {
	image: any;
	description: string;
	hightlight: string[];
	step: string;
}

interface IProps {
	data: ISliderItem[];
	handleScroll: (event: any) => void;
	flatListRef: React.RefObject<FlatList<any>>;
	viewabilityConfig: any;
	onViewableItemsChanged: (info: any) => void;
	scrollX: SharedValue<number>;
	imageContainerStyle: any;
	imageStyle: any;
}

const WidgetSliderItem = ({
	data,
	handleScroll,
	flatListRef,
	viewabilityConfig,
	onViewableItemsChanged,
	scrollX,
	imageContainerStyle,
	imageStyle,
}: IProps) => {
	const renderItem = ({ item, index }: { item: ISliderItem; index: number }) => {
		return (
			<AnimatedImage
				item={item}
				index={index}
				scrollX={scrollX}
				imageContainerStyle={imageContainerStyle}
				imageStyle={imageStyle}
			/>
		);
	};

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			pagingEnabled
			horizontal
			onScroll={handleScroll}
			ref={flatListRef}
			keyExtractor={(_, index) => index.toString()}
			viewabilityConfig={viewabilityConfig}
			onViewableItemsChanged={onViewableItemsChanged}
			showsHorizontalScrollIndicator={false}
		/>
	);
};

export default memo(WidgetSliderItem);

const AnimatedImage = ({
	index,
	scrollX,
	item,
	imageContainerStyle,
	imageStyle,
}: {
	index: number;
	scrollX: SharedValue<number>;
	item: ISliderItem;
	imageContainerStyle: any;
	imageStyle: any;
}) => {
	const { width } = useWindowDimensions();

	const animatedStyle = useAnimatedStyle(() => {
		const inputRange = [index - 1, index, index + 1].map((i) => i * width);

		const outputRange = isIos
			? [index % 2 === 0 ? 0 : 80, index % 2 === 0 ? 80 : -80, index % 2 === 0 ? 0 : 80]
			: [index % 2 === 0 ? 30 : 0, -30, index % 2 === 0 ? 30 : 0];

		const size = isIos && index === 1 ? 1 : 1.25;

		const top = interpolate(scrollX.value, inputRange, outputRange, 'clamp');
		const scale = interpolate(scrollX.value, inputRange, [0.7, size, 0.7], 'clamp');

		return {
			top: top,
			transform: [{ scale }],
		};
	});

	const textWrapperStyle = useAnimatedStyle(() => {
		const inputRange = [index - 1, index, index + 1].map((i) => i * width);

		const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0], 'clamp');

		return {
			opacity,
		};
	});

	return (
		<View style={[commonStyles.alignItemsCenter, { width: width }]}>
			<View style={[imageContainerStyle]}>
				<Animated.Image
					key={index?.toString()}
					resizeMode="contain"
					source={item.image}
					style={[imageStyle, animatedStyle]}
				/>
			</View>
			<Animated.View style={[styles.textWrapper, textWrapperStyle]}>
				<Text color="dark" bold variant="H4" style={styles.stepText}>
					{item.step}
				</Text>
				<TextMarker text={item.description} highlight={item.hightlight} />
			</Animated.View>
		</View>
	);
};
