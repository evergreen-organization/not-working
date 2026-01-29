import React, { useRef, useState } from 'react';
import { checkCameraPermission, checkGalleryPermission, showFailure } from 'utils';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Dimensions } from 'react-native';

import { CustomImagePickerView } from './component';
import { ImagePickerTypes } from './imagePicker.types';
import { initialBottom } from 'styles';

const { width, height } = Dimensions.get('window');

const pickerOption: Options = {
	cropping: false,
	multiple: false,
	mediaType: 'photo',
	includeBase64: true,
	compressImageMaxHeight: height,
	compressImageMaxWidth: width,
	compressImageQuality: 1,
};

export const CustomImagePicker = ({
	imageUri,
	onUploadImage,
	onReset,
	placeholder,
	style,
	testID,
	defaultImage,
}: ImagePickerTypes) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const imagePath = useRef<string>();
	const [loading, setLoading] = useState(false);

	const handleActionSheet = () => {
		showActionSheetWithOptions(
			{
				title: '',
				options: ['Take Photo', 'Upload from Gallery', 'Cancel'],
				cancelButtonIndex: 2,
				userInterfaceStyle: 'light',
				containerStyle: {
					paddingBottom: initialBottom,
				},
			},
			async (index) => {
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
			},
		);
	};

	const handleError = (err, actionType) => {
		if (err?.toString()?.indexOf('User cancelled') < 0) {
			showFailure('Error', `Please try again or ${actionType} another photo`);
		}
		console.log(err);
	};

	const handleTakePhoto = async () => {
		const cameraPermission = await checkCameraPermission();
		if (cameraPermission) {
			ImagePicker.openCamera(pickerOption)
				.then(async (image) => {
					imagePath.current = image.path;
					await processImage(image);
				})
				.catch((err) => {
					handleError(err, 'capture');
				})
				.finally(finishHandleImage);
		}
	};

	const handleUpload = async () => {
		const galleryPermission = await checkGalleryPermission();
		if (galleryPermission) {
			ImagePicker.openPicker(pickerOption)
				.then(async (image) => {
					imagePath.current = image.path;
					await processImage(image);
				})
				.catch((err) => {
					handleError(err, 'upload');
				})
				.finally(finishHandleImage);
		}
	};

	const finishHandleImage = () => {
		if (imagePath.current) {
			deleteTempfile(imagePath.current).then(() => (imagePath.current = undefined));
		}
	};

	const processImage = async (image) => {
		// Compress if size is more than 500kb
		setLoading(true);
		if (image.size > 500000) {
			const compressed = await compressImage(image);
			RNFS.readFile(compressed.path, 'base64')
				.then((base64) => {
					setLoading(false);
					return onUploadImage(base64);
				})
				.catch((err) => {
					console.error(err);
				});
		}
		setLoading(false);
		onUploadImage(image.data);
	};

	const compressImage = async (image) => {
		let resizedImage = await ImageResizer.createResizedImage(
			`file://${image.path}`,
			image.width * 0.9,
			image.height * 0.9,
			'JPEG',
			100, // quality
			0, // rotation
			null, // outputPath
			false, // keepMeta
			{ mode: 'contain' },
		);

		// Compress again if size is still more than 500kb
		if (resizedImage.size > 500000) {
			resizedImage = await compressImage(resizedImage);
		}

		deleteTempfile(`file://${resizedImage.path}`);

		return resizedImage;
	};

	const deleteTempfile = (filepath) => {
		return RNFS.exists(filepath)
			.then((result) => {
				// console.log("file exists: ", result, filepath)
				if (result) {
					return (
						RNFS.unlink(filepath)
							.then(() => {
								// console.log('FILE DELETED')
							})
							// `unlink` will throw an error, if the item to unlink does not exist
							.catch((err) => {
								console.log(err.message, filepath);
							})
					);
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const props = {
		handleActionSheet,
		onReset,
		imageUri,
		placeholder,
		style,
		testID,
		loading,
		defaultImage,
	};

	return <CustomImagePickerView {...props} />;
};
