import { QuickLinkItem } from '../quickLinkItem';
import React from 'react';

export const QuickLinkList = ({ list, onPress }) => {
	return list.map((item) => (
		<QuickLinkItem
			testID={item.testID}
			key={item.testID}
			icon={item.icon}
			label={item.label}
			onPress={(e) => onPress(e, item.path)}
		/>
	));
};
