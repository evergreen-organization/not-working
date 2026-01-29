import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export const useWidgetModal = ({ data, closeModal }: { data: any[]; closeModal: () => void }) => {
	const scrollX = useSharedValue(0);

	const flatListRef = useRef<FlatList<any>>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const onPressButton = useCallback(() => {
		if (currentIndex === data.length - 1) {
			closeModal?.();
		} else {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true,
			});
			setCurrentIndex((prev) => prev + 1);
		}
	}, [currentIndex]);

	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) =>
			(scrollX.value = event.nativeEvent.contentOffset.x),
		[],
	);

	const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
		if (viewableItems.length > 0) {
			const visibleIndex = viewableItems[0].index;
			setCurrentIndex(visibleIndex);
		}
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	const buttonTitle = useMemo(
		() => (currentIndex === data.length - 1 ? 'Got it!' : 'Next'),
		[currentIndex],
	);

	return {
		onPressButton,
		onScroll,
		onViewableItemsChanged,
		viewabilityConfig,
		flatListRef,
		scrollX,
		buttonTitle,
	};
};
