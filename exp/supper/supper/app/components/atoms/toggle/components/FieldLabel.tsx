import React from 'react';
import { TextStyle } from 'react-native';

import { colors, spacing } from 'configs';
import { Text } from '../../text';
import { BaseToggleProps } from '../types';

export const FieldLabel = (props: BaseToggleProps) => {
	const { status, label, labelPosition, labelStyle: $labelStyleOverride } = props;

	if (!label) {
		return null;
	}

	const $labelStyle = [
		$label,
		status === 'error' && { color: colors.error },
		labelPosition === 'right' && $labelRight,
		labelPosition === 'left' && $labelLeft,
		$labelStyleOverride,
	];

	return <Text style={$labelStyle}>{label}</Text>;
};

const $label: TextStyle = {
	flex: 1,
};

const $labelRight: TextStyle = {
	marginStart: spacing.md,
};

const $labelLeft: TextStyle = {
	marginEnd: spacing.md,
};
