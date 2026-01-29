import { checkCameraPermission, checkGalleryPermission } from './permissions';
import ImagePicker from 'react-native-image-crop-picker';
import { showFailure } from './message';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const pickerOption = {
	cropping: false,
	multiple: false,
	mediaType: 'photo',
	includeBase64: true,
	compressImageMaxHeight: window.height,
	compressImageMaxWidth: window.width,
	compressImageQuality: 1,
};

const handleError = (err, actionType) => {
	if (err?.toString()?.indexOf('User cancelled') < 0) {
		showFailure('Error', `Please try again or ${actionType} another photo`);
	}
	console.log(err);
};

const takePhoto = async () => {
	const cameraPermission = await checkCameraPermission();
	let imageUri = '';

	if (cameraPermission) {
		ImagePicker.openCamera(pickerOption)
			.then(async (image) => {
				imageUri = await processImage(image);
			})
			.catch((err) => {
				handleError(err, 'capture');
			});
	}
	return imageUri;
};

const uploadPhoto = async () => {
	let imageUri = '';

	const galleryPermission = await checkGalleryPermission();
	if (galleryPermission) {
		await ImagePicker.openPicker(pickerOption)
			.then(async (image) => {
				imageUri = await processImage(image);
			})
			.catch((err) => {
				handleError(err, 'upload');
			});
	}
	return imageUri;
};

const processImage = async (image) => {
	// Compress if size is more than 500kb
	if (image.size > 500000) {
		const compressed = await compressImage(image);
		RNFS.readFile(compressed.path, 'base64')
			.then((base64) => {
				return base64;
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return image.data;
};

const finishHandleImage = (imagePath) => {
	if (imagePath) {
		deleteTempFile(imagePath);
	}
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

	deleteTempFile(`file://${resizedImage.path}`);

	return resizedImage;
};

const deleteTempFile = (filepath) => {
	return RNFS.exists(filepath)
		.then((result) => {
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

export const imageUtils = {
	uploadPhoto,
	takePhoto,
};
