import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';

export const ToolTipView = ({
	isVisible,
	placement,
	onClose,
	content,
	children,
	props,
}) => {
	return (
		<Tooltip
			isVisible={isVisible}
			allowChildInteraction={false}
			placement={placement}
			onClose={onClose}
			content={content}
			{...props}
		>
			{children}
		</Tooltip>
	);
};
