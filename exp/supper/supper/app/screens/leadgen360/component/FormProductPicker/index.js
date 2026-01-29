import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { FormProductPickerView } from './component';
export const FormProductPicker = ({
	name,
	label,
	dataLabel = 'label',
	dataValue = 'value',
	data,
}) => {
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const [isVisible, setIsVisible] = useState(false);
	const [selected, setSelected] = useState({});

	const handleConfirm = (item) => {
		setFieldValue(name, item[dataValue]);
		setSelected(item);
		setIsVisible(false);
		setFieldTouched(name, false);
	};

	const handleProductPickerOpen = () => setIsVisible(true);
	const handleCloseProductPicker = () => setIsVisible(false);

	const props = {
		handleConfirm,
		handleProductPickerOpen,
		handleCloseProductPicker,
		name,
		label,
		dataLabel,
		dataValue,
		data,
		selected,
		isVisible,
	};

	return <FormProductPickerView {...props} />;
};
