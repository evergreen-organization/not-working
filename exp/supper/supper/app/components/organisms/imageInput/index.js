import React from 'react';
import { Image as RNImage } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { checkCameraPermission, checkGalleryPermission, showFailure } from 'utils';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageInputView } from './component';
import { addPhoto, deletePhoto, getAllPhotos, updatePhoto } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { initialBottom } from 'styles';

export const ImageInput = ({ image, imageName }) => {
	const dispatch = useDispatch();
	const { showActionSheetWithOptions } = useActionSheet();
	const photoList = useSelector(getAllPhotos);
	const defaultPhotoUrl = RNImage.resolveAssetSource(image?.source).uri;
	const existingPhoto = photoList?.find((photo) => photo.id === image.id);

	const savePhoto = (savedImage) => {
		const { path: sourceURL } = savedImage;
		existingPhoto?.id
			? dispatch(updatePhoto({ id: existingPhoto.id, sourceURL }))
			: dispatch(addPhoto({ id: image.id, sourceURL }));
	};

	const onResetPhoto = (_) => {
		if (existingPhoto) {
			return dispatch(deletePhoto({ id: existingPhoto.id }));
		}
	};

	const uploadFromGallery = async () => {
		const galleryPermission = await checkGalleryPermission();
		if (galleryPermission) {
			ImagePicker.openPicker({})
				.then((image) => {
					savePhoto(image);
				})
				.catch((err) => {
					if (err?.toString()?.indexOf('User cancelled') < 0) {
						showFailure('Upload Failed');
					}
					console.log(err.toString());
				});
		}
	};

	const openCamera = async () => {
		const cameraPermission = await checkCameraPermission();
		if (cameraPermission) {
			ImagePicker.openCamera({})
				.then((image) => {
					savePhoto(image);
				})
				.catch((err) => {
					if (err?.toString()?.indexOf('User cancelled') < 0) {
						showFailure('Upload Failed', err.toString());
					}
					console.log(err.toString());
				});
		}
	};
	const onAddNewPhoto = () => {
		showActionSheetWithOptions(
			{
				message: 'Add a Photo',
				options: ['Camera', 'Upload from Gallery', 'Cancel'],
				cancelButtonIndex: 2,
				containerStyle: {
					paddingBottom: initialBottom,
				},
			},
			(index) => {
				if (index === 2) {
					return;
				}
				if (index === 1) {
					return uploadFromGallery();
				}
				return openCamera();
			},
		);
	};

	const props = {
		onAddNewPhoto,
		onResetPhoto,
		defaultPhotoUrl,
		existingPhoto,
		imageName,
	};
	return <ImageInputView {...props} />;
};
