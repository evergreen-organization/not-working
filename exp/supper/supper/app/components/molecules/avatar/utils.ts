export const TOP_LEFT = 'topLeft';
export const TOP_RIGHT = 'topRight';
export const BOTTOM_LEFT = 'bottomLeft';
export const BOTTOM_RIGHT = 'bottomRight';

type AccessoryPositionProps = {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};
export const ACCESSORY_POSITION: { [key: string]: AccessoryPositionProps } = {
	[TOP_LEFT]: { top: 0, left: 0 },
	[TOP_RIGHT]: { top: 0, right: 0 },
	[BOTTOM_LEFT]: { bottom: 0, left: 0 },
	[BOTTOM_RIGHT]: { bottom: 0, right: 0 },
};

export type Position = keyof typeof ACCESSORY_POSITION;
