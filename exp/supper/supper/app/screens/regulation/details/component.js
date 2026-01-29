import React, { forwardRef } from 'react';
import { FlatList, View } from 'react-native';
import {
	AttachmentModal,
	DefinitionsModal,
	RegulationDialog,
	SelectionAnswerPath,
} from '../components';
import { colorGreen, colorOrange, styles } from './styles';
import { Button } from 'atoms';
import LoveIcon from 'assets/icon/love.png';
import { Header } from 'molecules';
import { Typography } from 'styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'configs';
import StepIndicator from 'react-native-step-indicator';
import { PdfModal } from 'organisms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const RegulationDetailsView = (
	{
		headerTitle,
		handleSaveToFavourite,
		handleDialogProgress,
		onInfoPress,
		onAttachmentPress,
		updateActiveTab,
		closeDefinitionsModal,
		closeModalAttachment,
		handleOnOpenPDF,
		handleOpenImage,
		closeModalPDF,
		activeTab,
		previousSelection,
		previousSelectionVisible,
		_carousel,
		tabs,
		isDefinitionsModalVisible,
		definitions,
		isAttachmentModalVisible,
		attachments,
		images,
		isPDFModalVisible,
		source,
		imageVisible,
		imageUri,
		imageIndex,
		setImageVisible,
		navigation,
		isFinalStep,
		onStepProgressPress,
		onSelectedAnswerPress,
		stepCount,
		previousAnswer,
	},
	ref,
) => {
	const handleHeaderLeftBtn = () => navigation.goBack();
	const { top } = useSafeAreaInsets();

	const renderDialogs = ({ item, index }) => {
		if (item !== undefined) {
			return (
				<View style={styles.dialogView}>
					<RegulationDialog
						tab={item}
						onChange={handleDialogProgress}
						onInfoPress={onInfoPress}
						onAttachmentPress={onAttachmentPress}
					/>
				</View>
			);
		}
	};

	const renderStepIndicatorIcon = ({ position, stepStatus }) => {
		if (position !== activeTab) {
			return;
		}
		if (isFinalStep) {
			return <Icon name="flag-checkered" size={15} color={colors.black} />;
		}
		return <Icon name="question" size={15} color={colorOrange} />;
	};

	return (
		<View style={[styles.container, { marginTop: top }]}>
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

			{/*Path*/}
			<View style={styles.pathContainer}>
				{/*Progress Bar and Favourite Button*/}
				<View style={styles.nav}>
					<View style={styles.stepIndicator}>
						<StepIndicator
							customStyles={{
								...styles.step,
								stepStrokeCurrentColor: isFinalStep ? colorGreen : colorOrange,
							}}
							currentPosition={activeTab}
							stepCount={isNaN(stepCount) ? 5 : stepCount}
							renderStepIndicator={renderStepIndicatorIcon}
							onPress={onStepProgressPress}
						/>
					</View>
					<Button
						onPress={handleSaveToFavourite}
						leftIcon={LoveIcon}
						style={styles.favourite}
						iconStyle={styles.favIcon}
					/>
				</View>
				{/*Selection Answer and Previous Selection Path*/}
				<SelectionAnswerPath
					previousAnswer={previousAnswer}
					previousSelection={previousSelection}
					isVisible={previousSelectionVisible}
					onPress={onSelectedAnswerPress}
				/>
			</View>

			<FlatList
				initialScrollIndex={activeTab}
				initialNumToRender={20}
				ref={ref}
				data={tabs}
				renderItem={renderDialogs}
				horizontal
				pagingEnabled
				scrollEnabled={false}
				onScrollToIndexFailed={(info) => {
					const wait = new Promise((resolve) => setTimeout(resolve, 500));
					wait.then(() => {
						ref.current?.scrollToIndex({ index: info.index, animated: true });
					});
				}}
			/>

			{/*Show Definition WebView Modal by Pressing Info Icon*/}
			<DefinitionsModal
				isVisible={isDefinitionsModalVisible}
				closeModal={closeDefinitionsModal}
				definitions={definitions}
			/>

			{/*Show Attachment Modal by Pressing Attachment File Icon*/}
			<AttachmentModal
				isVisible={isAttachmentModalVisible}
				closeModal={closeModalAttachment}
				attachments={attachments}
				images={images}
				onPressOpenPDF={handleOnOpenPDF}
				onPressOpenImage={handleOpenImage}
			/>

			{/*Show PDF Modal by Pressing PDF from List in Attachment Modal*/}
			<PdfModal source={source} closeModal={closeModalPDF} isVisible={isPDFModalVisible} />
		</View>
	);
};

export default forwardRef(RegulationDetailsView);
