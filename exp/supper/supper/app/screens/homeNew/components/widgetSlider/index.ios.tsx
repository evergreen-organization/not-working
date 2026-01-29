import React from 'react';
import styles from './styles';
import { SharedValue } from 'react-native-reanimated';
import stepOne from 'assets/widget/widget-ios-step-1.gif';
import stepTwo from 'assets/widget/widget-ios-step-2.gif';
import stepThree from 'assets/widget/widget-ios-step-3.gif';
import WidgetSliderItem from '../widgetSliderItem';

const data = [
	{
		image: stepOne,
		step: 'Step 1:',
		description: 'Long-press your home screen and tap the "+" icon.',
		hightlight: ['Long-press', '"+"'],
	},
	{
		image: stepTwo,
		step: 'Step 2:',
		description: 'Search or scroll for PBeXperience Widgets, choose a size, and tap "Add Widget."',
		hightlight: ['PBeXperience', '"Add Widget."'],
	},
	{
		image: stepThree,
		step: 'Step 3:',
		description: 'Drag it, Drop it, and there you go, your PBeXperience widget is good to go!',
		hightlight: ['Drag it, Drop it,', 'PBeXperience widget'],
	},
];

const WidgetSlider = ({
	handleScroll,
	flatListRef,
	viewabilityConfig,
	onViewableItemsChanged,
	scrollX,
}: {
	handleScroll: (event: any) => void;
	flatListRef: React.RefObject<any>;
	viewabilityConfig: any;
	onViewableItemsChanged: (info: any) => void;
	scrollX: SharedValue<number>;
}) => {
	return (
		<WidgetSliderItem
			data={data}
			handleScroll={handleScroll}
			flatListRef={flatListRef}
			viewabilityConfig={viewabilityConfig}
			onViewableItemsChanged={onViewableItemsChanged}
			scrollX={scrollX}
			imageContainerStyle={styles.iosImageContainer}
			imageStyle={styles.iosImage}
		/>
	);
};

export default WidgetSlider;
