import { IconNew, Screen, Text, Toggle } from 'atoms';
import { colors } from 'configs';
import { Header, PrimaryBottomButton } from 'molecules';
import React from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { Typography } from 'styles';
import applyChanges from '../../../assets/eBizCard/apply.png';
import { ComingSoonPopUp } from '../components';
import { styles } from './styles';

export const EBizCardFieldsComponent = ({
	handleSelection,
	handleGoBack,
	handleSubmit,
	handleClosePopUp,
	selectedItems,
	isPopUpVisible,
	isLoading,
	setIsPopUpVisible,
	handleAddressSelection,
}) => {
	const renderAddressSelection = (general, detailed, index, dIndex) => {
		const isDisabled = true;
		const isBothEnabled =
			selectedItems[index].isVisible === true && selectedItems[dIndex].isVisible === true;
		if (isBothEnabled) {
			handleSelection(selectedItems[dIndex], dIndex);
		}
		return (
			<View style={styles.$selectionButton}>
				<Toggle
					inputInnerStyle={{
						backgroundColor: colors.lightGrey,
					}}
					inputOuterStyle={{
						borderColor: '#C7C7C7',
					}}
					value={isDisabled}
					variant={'checkbox'}
					containerStyle={{ marginRight: 10 }}
					checkboxIcon={<IconNew type={'font-awesome'} name={'check'} size={15} color={'#fff'} />}
				/>

				<View style={styles.$columnAddress}>
					<TouchableOpacity
						activeOpacity={0.2}
						onPress={() => {
							if (selectedItems[index]?.isVisible === false) {
								handleAddressSelection(selectedItems[index], selectedItems[dIndex], index, dIndex);
							}
						}}
						style={styles.$touchableAddress}
					>
						<Toggle
							inputInnerStyle={{
								backgroundColor: selectedItems[index].isVisible ? '#fff' : colors.primary,
							}}
							inputOuterStyle={{
								borderColor: selectedItems[index].isVisible ? colors.primary : '#C7C7C7',
							}}
							value={selectedItems[index].isVisible}
							variant={'radio'}
							containerStyle={{ marginRight: 10 }}
							onPress={() => {
								if (selectedItems[index].isVisible === false) {
									handleAddressSelection(
										selectedItems[index],
										selectedItems[dIndex],
										index,
										dIndex,
									);
								}
							}}
						/>
						<Text style={styles.$labelAddress}>{selectedItems[index]?.label}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.2}
						onPress={() => {
							if (selectedItems[dIndex]?.isVisible === false) {
								handleAddressSelection(selectedItems[index], selectedItems[dIndex], index, dIndex);
							}
						}}
						style={styles.$touchableAddress}
					>
						<Toggle
							inputInnerStyle={{
								backgroundColor: selectedItems[dIndex]?.isVisible ? '#fff' : colors.primary,
							}}
							inputOuterStyle={{
								borderColor: selectedItems[dIndex]?.isVisible ? colors.primary : '#C7C7C7',
							}}
							value={selectedItems[dIndex]?.isVisible}
							variant={'radio'}
							containerStyle={{ marginRight: 10 }}
							onPress={() => {
								if (selectedItems[dIndex]?.isVisible === false) {
									handleAddressSelection(
										selectedItems[index],
										selectedItems[dIndex],
										index,
										dIndex,
									);
								}
							}}
						/>
						<View>
							<Text style={styles.$labelAddress}>{selectedItems[dIndex]?.label}</Text>
							<Text style={[styles.$descText, { paddingRight: 50 }]}>
								{selectedItems[dIndex]?.description}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderSelection = (item, index) => {
		const isDisabled = item.isRequired === true;
		if (item.key === 'officeAddress') {
			return <></>;
		} else if (item.key === 'branchAddress') {
			const general = item;
			const detailed = selectedItems.find((item) => item.key === 'officeAddress');
			const dIndex = selectedItems.findIndex((item) => item.key === 'officeAddress');
			return renderAddressSelection(general, detailed, index, dIndex);
		} else {
			return (
				<TouchableOpacity
					activeOpacity={isDisabled ? 1 : 0.2}
					onPress={() => {
						if (!isDisabled) {
							handleSelection(item, index);
						}
					}}
					key={item.key}
					style={styles.$selectionButton}
				>
					<Toggle
						inputInnerStyle={{
							backgroundColor: isDisabled ? colors.lightGrey : colors.primary,
						}}
						inputOuterStyle={{
							borderColor: '#C7C7C7',
						}}
						value={item.isVisible}
						disabled={isDisabled}
						variant={'checkbox'}
						containerStyle={{}}
						onPress={() => {
							handleSelection(item, index);
						}}
						checkboxIcon={<IconNew type={'font-awesome'} name={'check'} size={15} color={'#fff'} />}
					/>
					<View style={{ flexDirection: 'column' }}>
						<Text style={styles.$selectionLabel}>{item?.label}</Text>

						{item.description && (
							<Text style={[styles.$descText, { marginLeft: 10 }]}>{item.description}</Text>
						)}
					</View>
				</TouchableOpacity>
			);
		}
	};

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
						text: 'eBC Sharing Preferences',
						style: Typography.H6,
					}}
				/>
				{isLoading ? (
					<ActivityIndicator style={{ flex: 1 }} color={colors.primary} size="small" />
				) : (
					<>
						<View style={styles.$container}>
							<View style={{ marginTop: 10 }} />
							<Text style={styles.$labelAddress}>
								Some fields are compulsory and cannot be deselected.{'\n\n'}
								You can maintain your direct line numbers and detailed office address in HCMS under
								the “Contact Details” portlet.{'\n'}
							</Text>
							<View style={{ flex: 1, paddingBottom: 40 }}>
								<FlatList
									data={selectedItems}
									renderItem={({ item, index }) => renderSelection(item, index)}
									keyExtractor={(item) => item.key}
									showsVerticalScrollIndicator={false}
								/>
							</View>
						</View>
						<PrimaryBottomButton onPress={handleSubmit} title={'Update Preferences'} />
					</>
				)}
			</Screen>

			<ComingSoonPopUp
				isPopUpVisible={isPopUpVisible}
				setIsPopUpVisible={setIsPopUpVisible}
				onPressClosePopUp={handleClosePopUp}
				image={applyChanges}
				text={'Changes Applied!'}
				tintColor={false}
				backdropPress={true}
			/>
		</>
	);
};
