import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';
import CloseIcon from 'assets/icon/close.png';
import { styles } from './styles';
import BaseModal from '../baseModal';

export const Alert = ({
	isVisible,
	onClose,
	onConfirm,
	confirmButtonTitle = 'Confirm',
	cancelButtonTitle = 'Cancel',
	title = '',
	description,
	icon,
}) => {
	return (
		<BaseModal visible={isVisible} onBackdropPress={onClose}>
			<View style={styles.modalContainer}>
				<TouchableOpacity onPress={onClose}>
					<Image source={CloseIcon} style={styles.closeIcon} />
				</TouchableOpacity>
				{icon && <Image source={icon} style={styles.icon} />}
				<Text variant={'H6'} style={styles.modalTitle}>
					{title}
				</Text>
				<Text variant={'P6'} style={styles.modalText}>
					{description}
				</Text>
				<View style={styles.buttonView}>
					<TouchableOpacity style={styles.backButton} onPress={onClose}>
						<Text variant={'P7'} style={styles.cancelButtonText}>
							{cancelButtonTitle}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
						<Text variant={'P7'} style={styles.modalButtonText}>
							{confirmButtonTitle}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</BaseModal>
	);
};
