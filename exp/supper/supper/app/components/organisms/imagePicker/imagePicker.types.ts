import { ImageSourcePropType, ViewStyle } from 'react-native';

export interface ImagePickerTypes {
	imageUri?: string;
	onUploadImage: (image: string) => {} | void;
	onReset: () => {} | void;
	placeholder?: string;
	style?: ViewStyle;
	testID?: string;
	defaultImage?: ImageSourcePropType;
}

export interface ImagePickerCompTypes {
	onReset: () => {} | void;
	handleActionSheet: () => {} | void;
	imageUri?: string;
	defaultImage?: ImageSourcePropType;
	placeholder: string;
	style?: ViewStyle;
	testID?: string;
	loading: boolean;
}
