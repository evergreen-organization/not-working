import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Loading, Text } from 'atoms';
import { styles } from './styles';
import { ImagePickerCompTypes } from './imagePicker.types';

export const CustomImagePickerView = ({
	onReset,
	handleActionSheet,
	imageUri,
	defaultImage,
	placeholder = 'Press to Take/Upload Photo',
	style,
	testID,
	loading,
}: ImagePickerCompTypes) => {
	const renderImage = () => {
		if (imageUri) {
			return (
				<Image
					source={{ uri: `data:image/png;base64,${imageUri}` }}
					style={styles.image}
					resizeMode="contain"
				/>
			);
		}
		if (defaultImage) {
			return (
				<ImageBackground source={defaultImage} style={styles.defaultImage}>
					<View style={styles.overlay} />
					<Text variant={'P4'} style={styles.placeholder}>
						{placeholder}
					</Text>
				</ImageBackground>
			);
		}
		return (
			<>
				<View style={styles.overlay} />
				<Text variant={'P4'}>{placeholder}</Text>
			</>
		);
	};
	return (
		<>
			<View style={[styles.view, style]}>
				<TouchableOpacity testID={testID} onPress={handleActionSheet} style={styles.buttonView}>
					{renderImage()}
					{loading && <Loading />}
				</TouchableOpacity>
			</View>
			{onReset && (
				<TouchableOpacity onPress={onReset}>
					<Text style={styles.resetText}>Reset Photo</Text>
				</TouchableOpacity>
			)}
		</>
	);
};
