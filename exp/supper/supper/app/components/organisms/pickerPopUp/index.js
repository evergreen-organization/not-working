import React, { useState } from 'react';
import { PickerPopUpView } from './component';

export const PickerPopUp = ({
	label = null,
	dataLabel = 'label',
	dataValue = 'value',
	onCloseModal,
	visible,
	data,
	onSelect,
	...otherProps
}) => {
	const [searchText, setSearchText] = useState('');
	const [selectedItem, setSelectedItem] = useState({});
	const handleSelect = (item) => {
		setSelectedItem(item);
		onSelect(item);
		handleCloseModal();
	};

	const handleCloseModal = () => {
		setSearchText('');
		onCloseModal();
	};

	const filteredData = () => {
		if (searchText) {
			return data.filter(
				(item) =>
					item[dataLabel].toLowerCase().includes(searchText?.toLowerCase()) ||
					item[dataValue].toLowerCase().includes(searchText?.toLowerCase()),
			);
		}
		return data;
	};

	const props = {
		handleCloseModal,
		filteredData,
		handleSelect,
		setSearchText,
		dataValue,
		dataLabel,
		selectedItem,
		visible,
		label,
		testID: otherProps.testID,
	};

	return <PickerPopUpView {...props} />;
};
