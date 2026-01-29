import React, { useState } from 'react';
import { ProductSelectionPopUpComp } from './component';

export const ProductsSelectionPopUp = ({
	visible,
	onClose,
	data,
	dataLabel = 'label',
	onSubmit,
}) => {
	const [selectedProduct, setSelectedProduct] = useState({});
	const [isInfoShow, setIsInfoShow] = useState(false);
	const handleConfirm = () => {
		onSubmit(selectedProduct);
		onClose();
	};

	const getStatus = (item) => item[dataLabel] === selectedProduct[dataLabel];
	const handleInfoPress = () => setIsInfoShow(!isInfoShow);

	const handleSelectProduct = (item) => setSelectedProduct(item);

	const props = {
		handleSelectProduct,
		handleInfoPress,
		handleConfirm,
		getStatus,
		onClose,
		isInfoShow,
		visible,
		data,
		dataLabel,
	};

	return <ProductSelectionPopUpComp {...props} />;
};
