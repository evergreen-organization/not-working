import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { BottomModal } from 'molecules';
import { TextInput } from 'organisms';
import SearchIcon from 'assets/icon/search.png';
import { styles } from './styles';
import { colors } from 'configs';
import { Text } from 'atoms';

export const PickerPopUpView = ({
	dataValue,
	dataLabel,
	selectedItem,
	filteredData,
	handleSelect,
	visible,
	handleCloseModal,
	label,
	setSearchText,
	testID,
}) => {
	const checkIsSelected = (item) => item[dataValue] === selectedItem[dataValue];
	const renderPicker = () => {
		return (
			<ScrollView>
				{filteredData().map((item) => (
					<View key={item[dataLabel]}>
						<TouchableOpacity
							testID={`${testID}-selection-${item[dataLabel]}`}
							onPress={() => handleSelect(item)}
							style={{
								...styles.itemButton,
								backgroundColor: checkIsSelected(item) ? colors.primary : colors.white,
							}}
						>
							<Text
								style={{
									fontSize: 14,
									color: checkIsSelected(item) ? colors.white : colors.black,
								}}
							>
								{`${item[dataLabel]} - ${item[dataValue]}`}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		);
	};

	return (
		<BottomModal fullHeight isVisible={visible} onCancel={handleCloseModal}>
			<View style={styles.modalView}>
				<Text style={styles.label}>{label}</Text>
			</View>
			<View style={styles.row}>
				<TextInput style={styles.searchText} onChangeText={setSearchText} placeholder="Search" />
				<View pointerEvents={'none'} style={{ position: 'absolute', right: 0 }}>
					<Image source={SearchIcon} style={styles.searchIcon} />
				</View>
			</View>
			{renderPicker()}
		</BottomModal>
	);
};
