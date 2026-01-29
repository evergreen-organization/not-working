import React, { forwardRef, useCallback } from 'react';
import { Image, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { styles } from './styles';
import { Paginator } from 'molecules';
import { useSharedValue } from 'react-native-reanimated';

export const ImageSlides = ({ data, onPress }, ref) => {
	const { width } = useWindowDimensions();
	const scrollX = useSharedValue(0);

	const onScroll = useCallback((event) => (scrollX.value = event.nativeEvent.contentOffset.x), []);

	return (
		<>
			<ScrollView
				horizontal
				ref={ref}
				pagingEnabled={true}
				scrollEventThrottle={16}
				style={{ flex: 1, marginBottom: 5 }}
				showsHorizontalScrollIndicator={false}
				onScroll={onScroll}
			>
				{data.map((item, index) =>
					onPress ? (
						<TouchableOpacity
							key={item.uri}
							activeOpacity={1}
							style={styles.button}
							onPress={() => onPress(index)}
						>
							<Image style={styles.image} source={{ uri: `${item.uri}` }} />
						</TouchableOpacity>
					) : (
						<Image key={item} source={item} style={{ width: width, height: 200 }} />
					),
				)}
			</ScrollView>
			{data.length > 1 && <Paginator data={data} scrollX={scrollX} />}
		</>
	);
};

export default forwardRef(ImageSlides);
