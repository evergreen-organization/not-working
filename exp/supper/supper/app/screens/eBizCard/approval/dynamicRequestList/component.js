import React from 'react';
import { Screen, PrimaryButton } from 'atoms';
import { colors } from 'configs';
import { Header, SearchBar } from 'molecules';
import { ActivityIndicator, View } from 'react-native';
import { DeleteTagPopUp } from 'screens/eBizCard/components';
import { Typography } from 'styles';
import { ShadowedView } from 'react-native-fast-shadow';
import deleteIcon from 'assets/eBizCard/deleteBin.png';
import checkIcon from 'assets/eBizCard/check.png';
import { styles } from './styles';
import { SearchableSectionList } from './components/searchAbleSectionList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QRTagPopUp } from 'screens/eBizCard/components/dynamicTagPopUp/QRTagPopUp';
import { EBizApproveTagPopup } from '../../components/eBizApproveTagPopup';

export const DynamicRequestListComp = ({
	handleTextChange,
	handleTextClear,
	groupedData,
	searchInput,
	handleSelectAll,
	selectedItems,
	handleSortList,
	handleSelection,
	handleRenew,
	sortSelected,
	handleDelete,
	handleGoBack,
	handlePopUp,
	isLoading,
	isPopUpVisible,
	setIsPopUpVisible,
	qrValue,
	isQRVisible,
	setIsQRVisible,
	handleGenerateQRCode,
	hanleClosePopUp,
	isApproveVisible,
	setIsApproveVisible,
	handleCloseApprove,
}) => {
	const { bottom } = useSafeAreaInsets();
	const gap = bottom < 10 ? 10 : bottom;
	const renewColor = selectedItems.length <= 0 ? colors.lightGrey : colors.green;
	const deleteColor = selectedItems.length <= 0 ? colors.lightGrey : colors.red;
	return (
		<>
			<Screen>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleGoBack,
					}}
					centerComponent={{
						text: 'Dynamic eBC View Requests',
						style: Typography.H6,
					}}
					centerContainerStyle={{}}
				/>
				{isLoading ? (
					<ActivityIndicator style={{ flex: 1 }} color={colors.primary} size="large" />
				) : (
					<>
						<View style={styles.container}>
							<SearchBar
								searchInput={searchInput}
								onChangeText={(text) => handleTextChange(text)}
								onPressClear={handleTextClear}
								placeholder={'Type Any Keyword Here'}
								style={styles.searchBar}
							/>

							<ShadowedView style={styles.sectionList}>
								<SearchableSectionList
									data={groupedData}
									searchInput={searchInput}
									handleSelectAll={handleSelectAll}
									selectedItems={selectedItems}
									handleSortList={handleSortList}
									handleSelection={handleSelection}
									sortSelected={sortSelected}
									setIsApproveVisible={setIsApproveVisible}
									onPressGenerateQRCode={handleGenerateQRCode}
								/>
							</ShadowedView>
						</View>
						<View style={[styles.bottomView]}>
							<View style={[styles.buttonContainer]}>
								<PrimaryButton
									isTitleBold
									title="Delete"
									buttonStyle={{
										backgroundColor: deleteColor,
									}}
									shadowColor={deleteColor}
									leftIcon={deleteIcon}
									iconStyle={styles.buttonIcon}
									style={styles.button}
									onPress={handlePopUp}
									disabled={selectedItems.length <= 0}
								/>

								<PrimaryButton
									isTitleBold
									title="Renew"
									buttonStyle={{
										backgroundColor: renewColor,
									}}
									shadowColor={renewColor}
									leftIcon={checkIcon}
									style={styles.button}
									iconStyle={styles.buttonIcon}
									onPress={() => setIsApproveVisible(true)}
									disabled={selectedItems.length <= 0}
								/>
							</View>
							<View style={{ height: gap }} />
						</View>
					</>
				)}
			</Screen>
			<DeleteTagPopUp
				isVisible={isPopUpVisible}
				isLoading={isLoading}
				setVisible={setIsPopUpVisible}
				handlePopUp={handlePopUp}
				handleDelete={handleDelete}
			/>
			<EBizApproveTagPopup
				isVisible={isApproveVisible}
				isLoading={isLoading}
				setVisible={setIsApproveVisible}
				onClose={handleCloseApprove}
				onLeft={handleCloseApprove}
				onRight={handleRenew}
			/>
			<QRTagPopUp
				isQRVisible={isQRVisible}
				setIsPopUpVisible={setIsQRVisible}
				onPressClosePopUp={hanleClosePopUp}
				qrValue={qrValue}
			/>
		</>
	);
};
