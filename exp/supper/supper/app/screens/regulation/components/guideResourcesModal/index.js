import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Text } from 'atoms';

import { styles } from './styles';
import { BottomModal } from 'molecules';

export const GuideResourcesModal = ({
	landingDetails,
	openModalPDF,
	openModalImage,
	openModalResources,
	isVisible,
	onModalClose,
}) => {
	const { attachments, images, links } = landingDetails || {};

	return (
		<BottomModal isVisible={isVisible} onCancel={onModalClose} fullScreen={true}>
			<View style={styles.modalDraggableHeader}>
				<Text variant={'P7'}>
					Guide
					<Entypo name="dot-single" style={styles.dot} />
					Resources
				</Text>
			</View>
			<ScrollView nestedScrollEnabled={true}>
				<View style={styles.guideContainer}>
					<Text variant={'P6'} style={styles.title}>
						{`Guide (${(attachments?.length ?? 0) + (images?.length ?? 0)})`}
					</Text>
					<View>
						<ResourcesList list={attachments} onPress={openModalPDF} icon={'file-pdf-o'} />
						<ResourcesList list={images} onPress={openModalImage} icon={'file-image-o'} />
					</View>
				</View>
				<View style={styles.guideContainer}>
					<Text variant={'P6'} style={styles.title}>
						{`Resources (${links?.length ?? 0})`}
					</Text>
					<View>
						<ResourcesList list={links} onPress={openModalResources} icon={'link'} />
					</View>
				</View>
			</ScrollView>
		</BottomModal>
	);
};

const ResourcesList = ({ list, onPress, icon }) => {
	if (!list) {
		return null;
	}
	return list?.map(({ attachmentName, attachmentUrl }) => (
		<TouchableOpacity
			key={attachmentName}
			style={styles.guideButton}
			onPress={() => onPress(attachmentUrl)}
		>
			<FontAwesome name={icon} style={styles.icon} />
			<Text style={styles.guideText}>{attachmentName}</Text>
		</TouchableOpacity>
	));
};
