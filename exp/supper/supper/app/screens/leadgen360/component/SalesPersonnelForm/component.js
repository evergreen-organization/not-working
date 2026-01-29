import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from 'atoms';
import { FormDropDown } from 'components';
import { BottomModal } from 'molecules';
import { PickerPopUp } from 'organisms';
import { LOADING } from 'constant';

import { styles } from './styles';
import { OthersSalesPersonnel } from '../OthersSalesPersonnel';
import { SALES_PERSONNEL_LABEL, SALES_PERSONNEL_VALUE } from '../../utils';
import { leadgen_testID } from '../../../../../e2e/testID';

const types = {
	list: 'list',
	search: 'search',
	auto: 'auto',
};

export const SalesPersonnelFormView = ({
	handleCloseModal,
	handleSalesPersonnelDropDownPress,
	handleSalesPersonnelDropDownClose,
	handleSelectSalesPersonnelType,
	handleSelectSalesPersonnel,
	handleSearchSalesPersonnel,
	handleConfirmSearchSalesPersonnelModal,
	name,
	disabled,
	selectionType,
	label,
	modalOpen,
	showSelection,
	activeSalesPersonnel,
	searchedStaff,
	status,
	selectedSalesPersonnel,
}) => {
	const { name: staffName, staffNo } = selectedSalesPersonnel || {};
	const renderModal = () => {
		if (selectionType === types.list) {
			return (
				<PickerPopUp
					testID={leadgen_testID.displayAllSalesPersonnel}
					name={name}
					label={label}
					visible={modalOpen}
					onCloseModal={handleCloseModal}
					onSelect={handleSelectSalesPersonnel}
					dataValue={SALES_PERSONNEL_VALUE}
					dataLabel={SALES_PERSONNEL_LABEL}
					data={activeSalesPersonnel}
				/>
			);
		}
		if (selectionType === types.search) {
			return (
				<OthersSalesPersonnel
					name={name}
					visible={modalOpen}
					onCloseModal={handleCloseModal}
					onConfirmModal={handleConfirmSearchSalesPersonnelModal}
					onSearchSalesPersonnel={handleSearchSalesPersonnel}
					searchedStaff={searchedStaff}
					loading={status === LOADING}
				/>
			);
		}
	};

	const renderSelectionModal = () => (
		<BottomModal
			fullScreen={false}
			isVisible={showSelection}
			onCancel={handleSalesPersonnelDropDownClose}
		>
			<View style={styles.selectionButtonModalView}>
				<SelectionButton
					testID={leadgen_testID.systemAutoAssign}
					isBold={true}
					label={'System Auto Assign'}
					onPress={() => handleSelectSalesPersonnelType(types.auto)}
				/>
				<SelectionButton
					testID={leadgen_testID.displayAllSalesPersonnel}
					label={'Display All Active Sales Personnel'}
					onPress={() => handleSelectSalesPersonnelType(types.list)}
				/>
				<SelectionButton
					testID={leadgen_testID.searchOthersSalesPersonnel}
					label={'Search Others Sales Personnel'}
					onPress={() => handleSelectSalesPersonnelType(types.search)}
				/>
			</View>
		</BottomModal>
	);

	return (
		<View style={styles.container}>
			<FormDropDown
				testID={leadgen_testID.salesPersonnelSelectionType}
				name={name}
				label={label}
				disabled={disabled}
				onFormPickerPress={handleSalesPersonnelDropDownPress}
				value={`${staffName} ${staffNo}`}
				renderModal={showSelection && renderSelectionModal()}
			/>
			{modalOpen && renderModal()}
		</View>
	);
};

const SelectionButton = ({ onPress, label, isBold = false, testID }) => (
	<TouchableOpacity testID={testID} style={styles.selectionButtonView} onPress={onPress}>
		<Text variant={isBold ? 'P7' : 'P6'}>{label}</Text>
	</TouchableOpacity>
);

SalesPersonnelFormView.types = types;
