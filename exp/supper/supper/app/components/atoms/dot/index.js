import React from 'react';
import { Icon } from '../icon/index';

export const Dot = ({ size, color = '#333' }) => {
	if (!size || size <= 0) {
		return null;
	}

	return Array.from(Array(Math.ceil(size)).keys()).map((value) => {
		return (
			<Icon
				key={value}
				type={'font-awesome'}
				name={'circle'}
				style={{ fontSize: 6, marginRight: 1 }}
			/>
		);
	});
};
