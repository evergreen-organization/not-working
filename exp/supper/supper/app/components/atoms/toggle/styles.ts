import { StyleProp, ViewStyle } from 'react-native';
import { Variants } from './index';

const $inputOuterBase: ViewStyle = {
	height: 20,
	width: 20,
	borderWidth: 2,
	alignItems: 'center',
	overflow: 'hidden',
	flexGrow: 0,
	flexShrink: 0,
	justifyContent: 'space-between',
	flexDirection: 'row',
};

export const $inputOuterVariants: Record<Variants, StyleProp<ViewStyle>> = {
	checkbox: [$inputOuterBase, { borderRadius: 4 }],
	radio: [$inputOuterBase, { borderRadius: 12 }],
	switch: [
		$inputOuterBase,
		{ height: 32, width: 56, borderRadius: 16, borderWidth: 0 },
	],
};
