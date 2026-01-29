import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useFormikContext } from 'formik';
import { resetAddLeadForm } from 'stores';
import { routes } from 'navigations';

import { FormSubmitButtonView } from './component';

export const FormSubmitButton = ({ loading, customerAliasId }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { handleSubmit, resetForm, setTouched, errors } = useFormikContext();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleReset = () => {
		resetForm();
		dispatch(resetAddLeadForm());
		if (!customerAliasId) {
			navigation.navigate(routes.LG360_PROSPECT);
			navigation.navigate(routes.LG360_NEW_LEAD);
		}
		setTouched({ dateInterested: true });
	};

	const handleCreate = () => {
		if (Object.keys(errors).length === 0) {
			// Form is valid, do any success call
			setIsModalVisible(true);
		} else {
			setTouched({
				dateInterested: true,
				brDeptCode: true,
				salesPersonStaffNo: true,
				referralStaffNo: true,
				referralBranchDeptCode: true,
			});
		}
	};
	const handleClose = () => setIsModalVisible(false);
	const handleConfirm = () => {
		handleSubmit();
		setIsModalVisible(false);
	};

	const props = {
		handleReset,
		handleCreate,
		handleClose,
		handleConfirm,
		isModalVisible,
		loading,
	};

	return <FormSubmitButtonView {...props} />;
};
