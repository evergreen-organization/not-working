import { View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import BottomModal from '../bottomModal';
import { Text, Icon } from 'atoms';
import { TextInput } from 'organisms';
import { colors } from 'configs';
import SearchIcon from 'assets/icon/search.png';
import { debounce } from 'utils';
import { IDropdownModalPicker, IPickerViewProps } from './types';

const DropdownModalPicker = ({
	loading,
	icon,
	label,
	dropdownData = [],
	setSelectedItem,
	enableSearch,
	testID,
	selectedItem,
	style,
}: IDropdownModalPicker) => {
	const [isVisible, setIsVisible] = useState(false);

	const toogleModal = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<TouchableOpacity style={[styles.dropdownContainer, style]} onPress={toogleModal}>
				{icon && (
					<View style={styles.leftIconContainer}>
						<Image source={icon} style={styles.icon} />
					</View>
				)}
				<View style={styles.textContainer}>
					<Text style={styles.text} numberOfLines={1}>
						{selectedItem?.Name ?? label}
					</Text>
				</View>
				<View style={styles.rightIconContainer}>
					{loading ? (
						<ActivityIndicator color={colors.primary} size={'small'} />
					) : (
						<Icon type={'material'} name={'keyboard-arrow-down'} style={{ ...styles.rightIcon }} />
					)}
				</View>
			</TouchableOpacity>

			<BottomModal fullHeight isVisible={isVisible} onCancel={toogleModal}>
				<PickerView
					toogleModal={toogleModal}
					setSelectedItem={setSelectedItem}
					label={label}
					dropdownData={dropdownData}
					selectedItem={selectedItem}
					enableSearch={enableSearch}
					testID={testID}
				/>
			</BottomModal>
		</>
	);
};

export default DropdownModalPicker;

const PickerView = ({
	toogleModal,
	setSelectedItem,
	label,
	dropdownData,
	selectedItem,
	enableSearch,
	testID,
}: IPickerViewProps) => {
	const [filteredData, setFilteredData] = useState<Array<{ Id: string; Name: string }>>([]);

	useEffect(() => {
		setFilteredData(dropdownData);
	}, [dropdownData]);

	const onSearch = debounce((text: string) => {
		if (!text) {
			setFilteredData(dropdownData);
			return;
		}

		const filtered = dropdownData.filter((item) => {
			return item?.Name?.toLowerCase()?.includes(text?.toLowerCase());
		});
		setFilteredData(filtered);
	});

	return (
		<>
			<View style={styles.modalTitleView}>
				<Text variant={'P3'} style={styles.modalTitle}>
					{label}
				</Text>
			</View>
			{enableSearch && (
				<View style={styles.searchView}>
					<TextInput style={styles.searchText} onChangeText={onSearch} placeholder="Search" />
					<View pointerEvents={'none'} style={styles.searchIconView}>
						<Image source={SearchIcon} style={styles.searchIcon} />
					</View>
				</View>
			)}

			<FlatList
				data={filteredData}
				initialNumToRender={15}
				keyExtractor={(item) => item?.Id?.toString()}
				renderItem={({ item, index }) => {
					const isSelected = item?.Id === selectedItem?.Id;
					const onPress = () => {
						setSelectedItem(item);
						toogleModal();
					};
					return (
						<View key={item?.Id}>
							<TouchableOpacity
								testID={`${testID}-selection-${index}`}
								onPress={onPress}
								style={{
									...styles.listItem,
									backgroundColor: isSelected ? colors.primary : colors.white,
								}}>
								<Text
									variant={'P6'}
									style={{
										color: isSelected ? colors.white : colors.black,
									}}>
									{item?.Name}
								</Text>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</>
	);
};
