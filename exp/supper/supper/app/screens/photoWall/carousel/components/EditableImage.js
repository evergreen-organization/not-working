import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getAllPhotos } from 'stores';

const { height } = Dimensions.get('window');

export const EditableImage = ({ style, image }) => {
	const photoList = useSelector(getAllPhotos);
	const photo = photoList.find((e) => e.id === image.id);
	const defaultPhotoUrl = Image.resolveAssetSource(image?.source)?.uri;

	return (
		<View style={[styles.editableImage, style]}>
			<Image
				source={{ uri: photo?.sourceURL ?? defaultPhotoUrl }}
				style={styles.image}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	editableImage: {
		alignItems: 'center',
		justifyContent: 'center',
		height: height * 0.2,
		flex: 1,
		backgroundColor: '#818181AA',
	},
	image: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
});
