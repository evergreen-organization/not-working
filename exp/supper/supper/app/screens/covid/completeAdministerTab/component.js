import React from 'react';

import { ApprovalSectionList } from '../components';
import { COMPLETE_APPROVAL_LABEL } from '../utils/constant';

export const CompleteAdministerTabView = ({
	onRefresh,
	handleItemPress,
	data,
	loading,
}) => {
	return (
		<ApprovalSectionList
			testID={'pending-self-test-list'}
			emptyViewLabel={COMPLETE_APPROVAL_LABEL}
			data={data}
			loading={loading}
			onRefresh={onRefresh}
			onItemPress={handleItemPress}
		/>
	);
};
