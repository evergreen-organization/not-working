import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Text } from 'atoms';
import { BottomModal } from 'molecules';

import { styles } from './styles';

export const AttachmentModal = ({
	isVisible,
	closeModal,
	attachments,
	images,
	onPressOpenPDF,
	onPressOpenImage,
}) => {
	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal}>
			<ScrollView style={styles.container}>
				<View style={styles.view}>
					{attachments?.map((attachment, index) => (
						<TouchableOpacity
							key={attachment.attachmentName}
							style={styles.button}
							onPress={() => onPressOpenPDF(attachment)}
						>
							<FontAwesome name="file-pdf-o" style={styles.icon} />
							<Text style={styles.buttonText}>{attachment.attachmentName}</Text>
						</TouchableOpacity>
					))}
					{images?.map((image, index) => (
						<TouchableOpacity
							key={image}
							style={styles.button}
							onPress={() => onPressOpenImage(index)}
						>
							<Entypo name="image" style={styles.icon} />
							<Text style={styles.buttonText}>{image.attachmentName}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</BottomModal>
	);
};
