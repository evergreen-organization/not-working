import { Button, Icon } from 'atoms';
import { AnimatedScaleView, BottomModal, Paginator } from 'molecules';
import React from 'react';
import { View } from 'react-native';
import { useWidgetModal } from 'screens/homeNew/hooks/useWidgetModal';
import WidgetSlider from '../widgetSlider/index';
import styles from './style';

const data = [1, 2, 3];

const WidgetModal = ({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) => {
	const {
		onScroll,
		onPressButton,
		onViewableItemsChanged,
		viewabilityConfig,
		buttonTitle,
		flatListRef,
		scrollX,
	} = useWidgetModal({ data, closeModal });

	return (
		<BottomModal isVisible={isVisible} showLine={false} onCancel={closeModal} hideCancel>
			<AnimatedScaleView onPress={closeModal} style={styles.closeButton}>
				<Icon type={'ant-design'} name={'close'} style={styles.closeIcon} />
			</AnimatedScaleView>
			<View style={[styles.container]}>
				<WidgetSlider
					flatListRef={flatListRef}
					handleScroll={onScroll}
					onViewableItemsChanged={onViewableItemsChanged}
					viewabilityConfig={viewabilityConfig}
					scrollX={scrollX}
				/>
				<Paginator
					data={data}
					scrollX={scrollX}
					style={styles.paginator}
					dotStyle={styles.dot}
					dotWidth={[6, 6, 6]}
				/>
				<Button
					title={buttonTitle}
					style={styles.nextButton}
					onPress={onPressButton}
					typography="P2"
				/>
			</View>
		</BottomModal>
	);
};

export default WidgetModal;
