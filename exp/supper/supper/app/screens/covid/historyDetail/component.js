import React from 'react';

import { SelfTestDetails } from '../components/selfTestDetails';

import { formatDate, STATUS_TEXT_COLORS_SCHEME } from '../utils/constant';

export const HistoryDetailView = ({
	handleWithdraw,
	loading,
	imageUri,
	item,
}) => {
	const { date, result, base64Image, status, approvalDate } = item || {};

	const detailList = [
		{ label: 'Date', value: formatDate(date) },
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
		...(!!approvalDate && approvalDate !== ''
			? [{ label: 'Administer Date', value: formatDate(approvalDate) }]
			: []),
	];

	return (
		<SelfTestDetails
			variant={SelfTestDetails.variants.review}
			loading={loading}
			headerTitle={'My Result'}
			imageUri={base64Image ?? imageUri}
			detailList={detailList}
			status={status}
			onWithdraw={handleWithdraw}
			scrollViewTestID={'self-test-history-details-view'}
		/>
	);
};
