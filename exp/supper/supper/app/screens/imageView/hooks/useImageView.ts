import { IImageViewerItem } from 'navigations/types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

const useImageView = ({
	data,
	index,
}: {
	data: IImageViewerItem[];
	index: number;
}) => {
	const [activeIndex, setActiveIndex] = useState(index);
	const { width } = useWindowDimensions();

	const getItemLayout = (_: unknown, index: number) => ({
		length: width,
		index,
		offset: width * index,
	});

	const onViewAbleItemsChanged = useRef(({ viewableItems }: any) => {
		setActiveIndex(viewableItems[0]?.index);
	}).current;

	const indicator = useMemo(
		() => `${activeIndex + 1} / ${data?.length}`,
		[data?.length, activeIndex],
	);

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const keyExtractor = ({ uri }: IImageViewerItem) => uri;

	const onScrollToIndexFailed = useCallback(() => {}, []);

	return {
		getItemLayout,
		onViewAbleItemsChanged,
		indicator,
		viewConfig,
		keyExtractor,
		onScrollToIndexFailed,
		data,
		index,
	};
};

export default useImageView;
