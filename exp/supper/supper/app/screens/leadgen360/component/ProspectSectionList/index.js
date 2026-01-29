import React, { useState } from 'react';
import { ProspectSectionListView } from './component';

export const ProspectSectionList = ({
	data,
	onAddNewProduct,
	onRefresh,
	refreshing,
	status,
}) => {
	const [contentVisible, setContentVisible] = useState(null);
	const handleHeaderPress = ({ section }) =>
		setContentVisible((id) =>
			section.customerAliasId === id ? null : section.customerAliasId,
		);

	const props = {
		handleHeaderPress,
		onAddNewProduct,
		onRefresh,
		refreshing,
		contentVisible,
		data,
		status,
	};

	return <ProspectSectionListView {...props} />;
};
