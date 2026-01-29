import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';
import { BaseModal, Paginator } from 'molecules';
import Arrow from 'assets/icon/next.png';
import { PopUpItem } from '../popUpItem';
import { Button } from '../components/Button';
import { styles } from './styles';
import { commonStyles } from 'styles';

export const ADIDAwarenessPopUpComp = (
	{
		handleNext,
		handleCloseModal,
		slide,
		currentIndex,
		lastIndex,
		isIAMModalVisible,
		slideLength,
		IAMModalSlides,
		handlePrevious,
	},
	ref,
) => {
	const { viewConfig, viewableItemsChanged, scrollX, slidesRef } = ref;

	const renderButtonTitle = () => {
		if (slide?.buttonTitle) {
			return slide.buttonTitle;
		}
		if (currentIndex < lastIndex) {
			return 'Next';
		}
		return 'Close';
	};

	return (
		<BaseModal
			visible={isIAMModalVisible}
			onBackdropPress={handleCloseModal}
			containerStyle={[commonStyles.center]}
		>
			<View testID={'adid-awareness-pop-up'} style={styles.background}>
				<View style={styles.container}>
					<View style={styles.viewButton}>
						<TouchableOpacity
							leftComponent={{
								icon: 'chevron-left',
								type: 'font-awesome',
								testID: 'header-back-button',
							}}
							onPress={handlePrevious}
							style={styles.previousButtonView}
						>
							<Text variant={'P4'}>Previous</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.viewButton}>
						<TouchableOpacity
							testID={'adid-awareness-pop-up-close-button'}
							onPress={handleCloseModal}
							style={styles.closeButtonView}
						>
							<Text variant={'P4'} style={styles.closeText}>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Image source={slide?.image} style={[styles.slideImage]} />
				{slideLength !== 1 && (
					<Paginator data={IAMModalSlides} scrollX={scrollX} widthRatio={0.9} />
				)}
				<ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
					<FlatList
						nestedScrollEnabled
						data={IAMModalSlides}
						renderItem={({ item }) => <PopUpItem item={item} />}
						horizontal
						showsHorizontalScrollIndicator={false}
						pagingEnabled
						bounces={false}
						keyExtractor={(_, i) => i.toString()}
						onScroll={(event) => (scrollX.value = event.nativeEvent.contentOffset.x)}
						scrollEventThrottle={32}
						onViewableItemsChanged={viewableItemsChanged}
						viewabilityConfig={viewConfig}
						ref={slidesRef}
					/>
				</ScrollView>
				<Button
					testID={'adid-next-button'}
					onPress={handleNext}
					title={renderButtonTitle()}
					rightIcon={Arrow}
					style={[styles.buttonView]}
					titleStyle={styles.buttonTitle}
				/>
			</View>
		</BaseModal>
	);
};

export default forwardRef(ADIDAwarenessPopUpComp);
