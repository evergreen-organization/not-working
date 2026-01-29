import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useFormikContext } from 'formik';
import { Text, TextHelper } from 'atoms';
import { BottomModal } from 'molecules';
import { colors } from 'configs';
import { TextInput } from 'organisms';
import SearchIcon from 'assets/icon/search.png';
import { styles } from './styles';
import { FormFieldView, FormTitle } from '../components';

export const FormPickerView = ({
	closeModel,
	onChangeText,
	onOpenModal,
	filteredData,
	handleSelect,
	dataLabel,
	dataValue,
	mandatory,
	disabled,
	label,
	name,
	selectedLabel,
	enableSearch,
	visible,
	testID,
	textInputStyle,
	formikContext,
}) => {
	const { errors, touched, values } = useFormikContext() ?? formikContext;

	return (
		<View style={styles.container}>
			<FormTitle mandatory={mandatory} label={label} />
			<FormFieldView
				displayValue={selectedLabel}
				showValue={selectedLabel}
				disabled={disabled}
				onPress={onOpenModal}
				placeHolder={`Select ${label}`}
				textInputStyle={textInputStyle}
				testID={testID}
			/>
			{touched[name] && (
				<TextHelper isValid={!errors[name]} errorMsg={errors[name]} showCount={false} />
			)}

			<BottomModal fullHeight isVisible={visible} onCancel={closeModel}>
				<View style={styles.modalTitleView}>
					<Text variant={'P3'} style={styles.modalTitle}>
						{label}
					</Text>
				</View>
				{enableSearch && (
					<View style={styles.searchView}>
						<TextInput
							name={name}
							style={styles.searchText}
							onChangeText={(text) => onChangeText(text)}
							placeholder="Search"
						/>
						<View pointerEvents={'none'} style={styles.searchIconView}>
							<Image source={SearchIcon} style={styles.searchIcon} />
						</View>
					</View>
				)}

				{/*Selection List*/}
				<ScrollView>
					{filteredData().map((item, index) => (
						<View key={item[dataLabel]}>
							<TouchableOpacity
								testID={`${testID}-selection-${index}`}
								onPress={() => handleSelect(item)}
								style={{
									...styles.listItem,
									backgroundColor: item[dataValue] === values[name] ? colors.primary : colors.white,
								}}
							>
								<Text
									variant={'P6'}
									style={{
										color: item[dataValue] === values[name] ? colors.white : colors.black,
									}}
								>
									{item[dataLabel]}
								</Text>
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</BottomModal>
		</View>
	);
};
