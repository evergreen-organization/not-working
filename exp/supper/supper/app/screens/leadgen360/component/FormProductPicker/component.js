import React from 'react';

import { FormDropDown } from 'components';
import { leadgen_testID } from '../../../../../e2e/testID';
import { ProductsSelectionPopUp } from '../ProductsSelectionPopUp';

export const FormProductPickerView = ({
	name,
	label,
	dataLabel,
	data,
	handleConfirm,
	handleProductPickerOpen,
	handleCloseProductPicker,
	selected,
	isVisible,
}) => {
	return (
		<FormDropDown
			label={label}
			name={name}
			value={selected[dataLabel]}
			testID={leadgen_testID.productPicker}
			onFormPickerPress={handleProductPickerOpen}
			placeholder={`Select ${label}`}
			renderModal={
				<ProductsSelectionPopUp
					dataLabel={dataLabel}
					visible={isVisible}
					onClose={handleCloseProductPicker}
					data={data}
					onSubmit={handleConfirm}
				/>
			}
		/>
	);
};
