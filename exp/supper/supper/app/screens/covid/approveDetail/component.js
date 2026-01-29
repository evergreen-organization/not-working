import React from 'react';

import { formatDate, STATUS_TEXT_COLORS_SCHEME } from '../utils/constant';
import { SelfTestDetails } from '../components/selfTestDetails';

export const ApproveDetailView = ({
	handleReject,
	handleSubmit,
	loading,
	item,
	imageUri,
}) => {
	const {
		staffNo,
		staffName,
		date,
		result,
		base64Image,
		status,
		approvalDate,
	} = item;

	const detailList = [
		{ label: 'Date', value: formatDate(date) },
		{
			label: 'Name',
			value: staffName,
			valueStyle: { flex: 1, textAlign: 'right', marginLeft: 10 },
		},
		{ label: 'StaffNo', value: staffNo },
		{
			label: 'Result',
			value: result,
			color: STATUS_TEXT_COLORS_SCHEME[result],
		},
		{
			label: 'Status',
			value: status,
			color: STATUS_TEXT_COLORS_SCHEME[status],
		},
		!!approvalDate &&
			approvalDate !== '' && [
				{ label: 'Administer Date', value: formatDate(approvalDate) },
			],
	];

	return (
		<SelfTestDetails
			variant={SelfTestDetails.variants.approve}
			headerTitle={`${staffName}'s Result`}
			loading={loading}
			imageUri={base64Image ?? imageUri}
			detailList={detailList}
			status={status}
			onReject={handleReject}
			onSubmit={handleSubmit}
		/>
	);
};
