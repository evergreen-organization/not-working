import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { FormPickerView } from './component';

export const FormPicker = ({
	label = null,
	enableSearch = false,
	hideLabel,
	name,
	loading,
	disabled,
	data,
	dataLabel = 'label',
	dataValue = 'value',
	mandatory = false,
	clearOnSelect,
	onSelect = () => {},
	textInputStyle,
	formikContext,
	...otherProps
}) => {
	const { setFieldValue, values, setStatus, resetForm } = useFormikContext() ?? formikContext;
	const [visible, setVisible] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [selectedLabel, setSelectedLabel] = useState('');

	useEffect(() => {
		getSelectedLabel(values[name]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values[name]]);

	useEffect(() => {
		if (!values[name]) {
			return setSelectedLabel('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const handleSelect = (item) => {
		if (values[name] !== item[dataValue] && clearOnSelect) {
			resetForm();
		}
		setStatus(name);
		setFieldValue(name, item[dataValue]);
		onSelect(item[dataValue]);
		closeModel();
	};

	const getSelectedLabel = (value) => {
		const selected = data.find((e) => e[dataValue] === value);

		if (selected) {
			setSelectedLabel(selected[dataLabel]);
		}
	};
	const filteredData = () => {
		if (!data) {
			return [];
		}
		if (!searchText) {
			return data;
		}
		return data.filter((item) => item[dataLabel].toLowerCase().includes(searchText.toLowerCase()));
	};

	const closeModel = () => {
		setVisible(false);
		setSearchText(null);
	};

	const onOpenModal = () => setVisible(true);
	const onChangeText = (text) => setSearchText(text);

	const props = {
		closeModel,
		onChangeText,
		onOpenModal,
		filteredData,
		handleSelect,
		dataLabel,
		dataValue,
		hideLabel,
		mandatory,
		disabled,
		label,
		name,
		selectedLabel,
		data,
		enableSearch,
		visible,
		testID: otherProps.testID,
		textInputStyle,
		formikContext,
	};

	return <FormPickerView {...props} />;
};
