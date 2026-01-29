import React from 'react';
import styles from './styles';
import { SharedValue } from 'react-native-reanimated';
import stepOne from 'assets/widget/widget-android-step-1.gif';
import stepTwo from 'assets/widget/widget-android-step-2.gif';
import stepThree from 'assets/widget/widget-android-step-3.gif';
import WidgetSliderItem from '../widgetSliderItem';

const data = [
	{
		image: stepOne,
		step: 'Step 1:',
		description: 'Long-press an empty area on your home screen, then tap "Widgets" from the menu.',
		hightlight: ['Long-press', '"Widgets"'],
	},
	{
		image: stepTwo,
		step: 'Step 2:',
		description: 'Scroll or search for the PBeXperience widget.',
		hightlight: ['PBeXperience widget.'],
	},
	{
		image: stepThree,
		step: 'Step 3:',
		description:
			'Add the desired widget to the home screen. Your PBeXperience widget is now ready for use!',
		hightlight: ['PBeXperience widget'],
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
			imageContainerStyle={styles.androidImageContainer}
			imageStyle={styles.androidImage}
		/>
	);
};

export default WidgetSlider;
