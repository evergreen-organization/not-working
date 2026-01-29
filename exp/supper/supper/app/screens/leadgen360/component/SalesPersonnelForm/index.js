import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { Alert } from 'react-native';
import _ from 'lodash';

import { getLeadGen, searchSalesPersonnel } from 'stores';

import { SALES_PERSONNEL_VALUE, SYSTEM_AUTO_ASSIGN } from '../../utils';
import { SalesPersonnelFormView } from './component';

export const SalesPersonnelForm = ({ name, label, disabled }) => {
	const dispatch = useDispatch();
	const { setFieldValue, setStatus, setFieldTouched } = useFormikContext();
	const { activeSalesPersonnel, status, selectedBranch } = useSelector(getLeadGen);
	const [selectionType, setSelectionType] = useState(SalesPersonnelFormView.types.list);
	const [modalOpen, setModalOpen] = useState(false);
	const [showSelection, setShowSelection] = useState(false);
	const [searchedStaff, setSearchedStaff] = useState({});
	const [selectedSalesPersonnel, setSelectedSalesPersonnel] = useState({});

	useEffect(() => {
		// reset sales personnel when selected branch change
		setFieldValue(name, '');
		setSelectedSalesPersonnel({});
	}, [selectedBranch]);
	const handleSalesPersonnelDropDownPress = () => {
		setShowSelection(true);
	};
	const handleCloseModal = () => setModalOpen(false);
	const handleSalesPersonnelDropDownClose = () => setShowSelection(false);
	const handleSelectSalesPersonnelType = (type) => {
		if (type === SalesPersonnelFormView.types.auto) {
			setFieldValue(name, SYSTEM_AUTO_ASSIGN.fieldValue);
			setSelectedSalesPersonnel(SYSTEM_AUTO_ASSIGN);
		}
		setSelectionType(type);
		setShowSelection(false);
		setModalOpen(true);
	};
	const handleSelectSalesPersonnel = (item) => {
		setFieldTouched(name, true);
		setStatus(name);
		setFieldValue(name, item[SALES_PERSONNEL_VALUE]);
		setSelectedSalesPersonnel(item);
		handleCloseModal();
	};

	const handleSearchSalesPersonnel = async (staffNo) => {
		const { payload } = await dispatch(searchSalesPersonnel({ staffNo }));
		if (payload.problem) {
			setSearchedStaff({});
			return Alert.alert('Error', 'Sales Personnel ID not found.');
		}
		setSearchedStaff(payload.data);
	};

	const handleConfirmSearchSalesPersonnelModal = () => {
		if (!_.isEmpty(searchedStaff)) {
			setFieldValue(name, searchedStaff.staffNo);
			setSelectedSalesPersonnel(searchedStaff);
			handleCloseModal();
		}
	};

	const props = {
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
		selectedSalesPersonnel,
		showSelection,
		activeSalesPersonnel,
		searchedStaff,
		status,
	};

	return <SalesPersonnelFormView {...props} />;
};
