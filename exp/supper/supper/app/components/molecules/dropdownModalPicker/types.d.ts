import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type TItem = { Id: string; Name: string };

export interface IDropdownModalPicker {
	label: string;
	dropdownData: Array<TItem>;
	selectedItem?: TItem;
	setSelectedItem: (item: TItem) => void;
	enableSearch?: boolean;
	icon?: ImageSourcePropType;
	testID?: string;
	style: StyleProp<ViewStyle>;
	loading?: boolean;
}

export interface IPickerViewProps {
	toogleModal: () => void;
	setSelectedItem: (item: TItem) => void;
	label: string;
	dropdownData: Array<TItem>;
	selectedItem?: TItem;
	enableSearch?: boolean;
	testID?: string;
}
