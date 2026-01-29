import React from 'react';
import { BottomModal, Header } from 'molecules';
import { Animated, ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview';
import LikeIcon from 'assets/icon/like.png';
import { colors } from 'configs';
import { Swipeable } from 'react-native-gesture-handler';
import { Button, PrimaryButton, Screen, Text } from 'atoms';
import { GuideResourcesModal, RegulationPath } from '../components';
import { styles } from './styles';
import { Typography } from 'styles';
import DustbinIcon from 'assets/icon/dustbin.png';
import { PdfModal } from 'organisms';

export const RegulationLandingPageComponent = ({
	landingDetails,
	contentWebViewRef,
	webViewOnLoad,
	favouritePath,
	headerTitle,
	handleSwipeToOpen,
	swipeableItem,
	handleSwipeableRightWillOpen,
	handleOnDeleteFavouritePath,
	handleOnSelectSavedPath,
	handleLongPress,
	handleOnPressStart,
	isResourceModalVisible,
	closeModalResource,
	resourceUrl,
	isPDFModalVisible,
	closeModalPDF,
	source,
	isRateModalVisible,
	closeModalRate,
	imageVisible,
	imageUri,
	imageIndex,
	setImageVisible,
	openModalPDF,
	openModalImage,
	openModalResources,
	navigation,
	onRate,
	onGuidePress,
	onGuideClose,
	isModalGuideVisible,
}) => {
	const handleHeaderLeftBtn = () => navigation.goBack();

	const { title, description, surveyUrl } = landingDetails;

	return (
		<>
			<Screen singlePage>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleHeaderLeftBtn,
					}}
					centerComponent={{
						text: headerTitle,
						style: Typography.H6,
					}}
				/>
				<ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
					<View style={styles.descriptionContainer}>
						<Text variant={'H4'} style={styles.title}>
							{title ?? 'Regulation Title'}
						</Text>
						{description && (
							<WebView
								ref={contentWebViewRef}
								originWhitelist={['*']}
								source={{ html: description }}
								useWebKit={true}
								onLoad={webViewOnLoad}
								scrollEnabled={false}
							/>
						)}
						<View style={styles.divider} />
						{surveyUrl && (
							<Button
								preset={'text'}
								onPress={onRate}
								title={'Rate Me!'}
								leftIcon={LikeIcon}
								labelStyle={styles.iconText}
								typography={'P10'}
								iconStyle={styles.icon}
							/>
						)}
					</View>
					<View style={styles.favPathContainer}>
						<Text variant={'P10'} style={styles.favText}>
							{`Favourite Paths(${favouritePath.length})`}
						</Text>

						{favouritePath?.length !== 0 ? (
							favouritePath.map(({ circularId, path }, index) => (
								<Swipeable
									key={`${circularId}:${path}`}
									ref={(item) => (swipeableItem[index] = item)}
									friction={1}
									leftThreshold={0}
									rightThreshold={80}
									onSwipeableOpen={() => handleSwipeToOpen(swipeableItem[index])}
									onSwipeableWillOpen={() => handleSwipeableRightWillOpen(swipeableItem[index])}
									renderRightActions={(dragX) => (
										<Animated.View
											style={{
												...styles.deleteContainer,
												transform: [
													{
														scale: dragX.interpolate({
															inputRange: [0, 80],
															outputRange: [1, 0],
															extrapolate: 'clamp',
														}),
													},
												],
											}}
										>
											<Button
												onPress={() => handleOnDeleteFavouritePath(index)}
												leftIcon={DustbinIcon}
												iconStyle={styles.deleteIcon}
												style={styles.deleteButton}
											/>
										</Animated.View>
									)}
								>
									<RegulationPath
										answers={path?.answers}
										onPress={() => handleOnSelectSavedPath(index)}
										onLongPress={() => handleLongPress(swipeableItem[index])}
									/>
								</Swipeable>
							))
						) : (
							<Text variant={'P10'} style={styles.emptyFavPathText}>
								No favourite path added yet, why not get started and add some
							</Text>
						)}
					</View>
				</ScrollView>

				<View style={styles.buttonContainer}>
					<PrimaryButton
						title={'Guide'}
						onPress={onGuidePress}
						shadowColor={colors.black}
						buttonStyle={styles.leftButton}
						style={styles.guideButton}
					/>
					<PrimaryButton title={'Start'} onPress={handleOnPressStart} style={styles.rightButton} />
				</View>

				{/*Resourse Modal*/}
				<BottomModal fullHeight isVisible={isResourceModalVisible} onCancel={closeModalResource}>
					<WebView bounces={false} source={{ uri: resourceUrl }} useWebKit={true} />
				</BottomModal>

				{/*PDF Modal*/}
				<PdfModal source={source} isVisible={isPDFModalVisible} closeModal={closeModalPDF} />

				{/*Survey Modal*/}
				<BottomModal isVisible={isRateModalVisible} fullHeight onCancel={closeModalRate}>
					<WebView bounces={false} source={{ uri: surveyUrl ?? '' }} useWebKit={true} />
				</BottomModal>
			</Screen>

			{/* Place outside <Screen /> for fullscreen backdrop */}
			<GuideResourcesModal
				isVisible={isModalGuideVisible}
				onModalClose={onGuideClose}
				landingDetails={landingDetails}
				openModalPDF={openModalPDF}
				openModalImage={openModalImage}
				openModalResources={openModalResources}
			/>
		</>
	);
};
