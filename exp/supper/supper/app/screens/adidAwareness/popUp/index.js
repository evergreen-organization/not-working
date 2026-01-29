import React, { useRef, useState } from 'react';
import { useIAMModal } from 'contexts';
import ADIDAwarenessPopUpComp from './component';
import { useSharedValue } from 'react-native-reanimated';

export const ADIDAwarenessPopUp = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { isIAMModalVisible, setIsIAMModalVisible, IAMModalSlides } = useIAMModal();
	const scrollX = useSharedValue(0);
	const slidesRef = useRef(null);
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 1 }).current;
	const viewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const lastIndex = IAMModalSlides.length - 1;
	const slide = IAMModalSlides[currentIndex];
	const slideLength = IAMModalSlides.length;

	const handleNext = () => {
		const currentSlide = IAMModalSlides[currentIndex];
		const path = currentSlide.conditionalNavigation();
		if (path) {
			return handleCloseModal();
		}
		if (currentIndex < lastIndex) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			handleCloseModal();
		}
	};

	const handleCloseModal = (_) => {
		scrollX.value = 0;
		setIsIAMModalVisible(false);
	};

	const handlePrevious = () => {
		if (currentIndex > 0) {
			slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
		} else {
			handleCloseModal();
		}
	};

	const refs = {
		viewConfig,
		viewableItemsChanged,
		scrollX,
		slidesRef,
	};

	const props = {
		handleCloseModal,
		handleNext,
		slide,
		slideLength,
		lastIndex,
		isIAMModalVisible,
		IAMModalSlides,
		currentIndex,
		handlePrevious,
	};

	return <ADIDAwarenessPopUpComp {...props} ref={refs} />;
};
