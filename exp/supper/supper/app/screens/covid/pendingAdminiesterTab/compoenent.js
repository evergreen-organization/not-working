import React from 'react';

import { ApprovalSectionList } from '../components';
import { PENDING_APPROVAL_LABEL } from '../utils/constant';

export const PendingAdministerView = ({ handleRefresh, handlePendingItemPress, data, loading }) => {
	return (
		<ApprovalSectionList
			testID={'pending-self-test-list'}
			emptyViewLabel={PENDING_APPROVAL_LABEL}
			data={data}
			loading={loading}
			onRefresh={handleRefresh}
			onItemPress={handlePendingItemPress}
		/>
	);
};
