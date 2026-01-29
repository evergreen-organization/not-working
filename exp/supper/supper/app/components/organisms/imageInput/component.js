import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Text } from 'atoms';

export const ImageInputView = ({
	onAddNewPhoto,
	onResetPhoto,
	defaultPhotoUrl,
	existingPhoto,
	imageName,
}) => {
	return (
		<View style={styles.view}>
			<Text bold style={{ fontSize: 14 }}>
				{imageName}
			</Text>
			<TouchableOpacity onPress={onAddNewPhoto} style={styles.button}>
				<ImageBackground
					source={{
						uri: existingPhoto ? existingPhoto.sourceURL : defaultPhotoUrl,
					}}
					style={styles.image}
				>
					{!existingPhoto && (
						<>
							<View style={styles.overlay} />
							<Text style={styles.uploadText}>Upload Picture</Text>
						</>
					)}
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={onResetPhoto}>
				<Text style={styles.resetText}>Reset Photo</Text>
			</TouchableOpacity>
		</View>
	);
};
