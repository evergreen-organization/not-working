import React, { useRef } from 'react';
import { CustomImagePickerView } from './component';
import { mockImage } from './mockImage';

export const CustomImagePicker = ({
	imageUri,
	onUploadImage,
	placeholder,
	style,
	testID,
}) => {
	const actionSheet = useRef();
	const handleActionSheet = async (index) => {
		switch (index) {
			case 0:
				await handleTakePhoto();
				break;
			case 1:
				await handleUpload();
				break;
			default:
				break;
		}
	};

	const handleTakePhoto = async () => {
		onUploadImage(mockImage);
	};

	const handleUpload = async () => {
		onUploadImage(mockImage);
	};

	const props = {
		handleActionSheet,
		actionSheet,
		imageUri,
		placeholder,
		style,
		testID,
	};

	return <CustomImagePickerView {...props} />;
};
