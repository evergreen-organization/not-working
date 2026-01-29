import React from 'react';
import { View } from 'react-native';
import { Text, Dot } from 'atoms';
export const maskType = {
	MASK_USER_ID: 'userId',
	MASK_PIN: 'pin',
	MASK_NONE: 'none',
};

export const maskUserId = (label) => {
	if (!label || label.length === 0) {
		return '';
	}
	let mask = label.slice(2, 6);
	mask = mask.replace(/[a-z]\d{3}/, '****');
	return label.slice(0, 2) + mask + label.slice(6, 8);
};
export const mask = ({ type = maskType.MASK_NONE, label }) => {
	if (!label || label.length === 0) {
		return;
	}
	if (type === maskType.MASK_USER_ID) {
		return <Text variant={'H4'}>{maskUserId(label)}</Text>;
	}
	if (type === maskType.MASK_PIN) {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Dot size={label.length} />
			</View>
		);
	}
	return <Text variant={'H4'}>{label}</Text>;
};

mask.type = maskType;
