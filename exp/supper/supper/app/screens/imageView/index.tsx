import { Icon, Text } from 'atoms';
import { ImageZoom } from 'molecules';
import { goBack } from 'navigations/RootNavigation';
import { IImageViewerItem } from 'navigations/types';
import React from 'react';
import {
	FlatList,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { commonStyles } from 'styles';
import useImageView from './hooks/useImageView';
import styles from './styles';
import { TImageView } from './types';

const ImageView = ({ route }: TImageView) => {
	const { top, bottom } = useSafeAreaInsets();
	const { width, height } = useWindowDimensions();
	const { index = 0, data = [] } = route.params;

	const {
		getItemLayout,
		onViewAbleItemsChanged,
		indicator,
		viewConfig,
		keyExtractor,
		onScrollToIndexFailed,
	} = useImageView({ data, index });

	const renderItem = ({ item }: { item: IImageViewerItem }) => {
		return (
			<ImageZoom
				uri={item.uri}
				style={[
					{
						width,
						height,
					},
				]}
				resizeMode="contain"
			/>
		);
	};

	return (
		<View style={[commonStyles.fill, styles.container]}>
			<TouchableOpacity
				style={[commonStyles.center, styles.iconContainer, { top: top + 10 }]}
				onPress={goBack}
			>
				<Icon type={'EvilIcons'} name={'close'} style={[styles.icon]} />
			</TouchableOpacity>
			<FlatList
				horizontal
				pagingEnabled
				data={data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				contentContainerStyle={[commonStyles.center]}
				initialScrollIndex={index}
				showsHorizontalScrollIndicator={false}
				onScrollToIndexFailed={onScrollToIndexFailed}
				getItemLayout={getItemLayout}
				viewabilityConfig={viewConfig}
				onViewableItemsChanged={onViewAbleItemsChanged}
			/>
			<Text
				style={[
					commonStyles.textCenter,
					styles.pageIndicator,
					{ bottom: bottom + 10 },
				]}
			>
				{indicator}
			</Text>
		</View>
	);
};

export default ImageView;
