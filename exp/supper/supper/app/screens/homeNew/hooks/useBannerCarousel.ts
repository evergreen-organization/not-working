import { useCallback, useEffect, useRef, useState } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { IItem, TModal } from '../components/bannerCarousel/types';
import { BANNER_LIST } from '../constant';

const SCROLL_INTERVAL = 9000;

const useMyBannerCarousel = () => {
	const [modalType, setModalType] = useState<TModal>(null);
	const { width } = useWindowDimensions();
	const scrollX = useSharedValue(0);
	const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
	const flatListRef = useRef<FlatList<IItem>>(null);
	const currentIndex = useRef(0);

	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const offsetX = event.nativeEvent.contentOffset.x;
			scrollX.value = offsetX;
			const index = Math.round(offsetX / width);
			currentIndex.current = index;
		},
		[scrollX, width],
	);

	const scrollToIndex = useCallback((index: number, animated: boolean = true) => {
		flatListRef.current?.scrollToIndex({
			index,
			animated,
		});
	}, []);

	const startAutoScroll = useCallback(() => {
		if (autoScrollTimer.current) {
			clearInterval(autoScrollTimer.current);
		}

		if (!BANNER_LIST?.length) return;

		autoScrollTimer.current = setInterval(() => {
			const nextIndex = (currentIndex.current + 1) % BANNER_LIST.length;
			currentIndex.current = nextIndex;
			scrollToIndex(nextIndex);
		}, SCROLL_INTERVAL);
	}, [scrollToIndex, BANNER_LIST?.length]);

	const onScrollBeginDrag = useCallback(() => {
		if (autoScrollTimer.current) {
			clearInterval(autoScrollTimer.current);
			autoScrollTimer.current = null;
		}
	}, []);

	const onScrollEndDrag = useCallback(() => {
		startAutoScroll();
	}, [startAutoScroll]);

	const onScrollToIndexFailed = () => {};

	useEffect(() => {
		// on android, since mounting app navigator does many jobs which block js thread, delay auto scroll start to avoid initial scroll failure
		const timeout = setTimeout(() => {
			startAutoScroll();
		}, 4000);

		return () => {
			clearTimeout(timeout);
			if (autoScrollTimer.current) {
				clearInterval(autoScrollTimer.current);
			}
		};
	}, []);

	return {
		scrollX,
		flatListRef,
		onScroll,
		onScrollBeginDrag,
		onMomentumScrollEnd: onScrollEndDrag,
		onScrollEndDrag,
		width,
		modalType,
		setModalType,
		onScrollToIndexFailed,
		bannerData: BANNER_LIST,
	};
};

export default useMyBannerCarousel;
