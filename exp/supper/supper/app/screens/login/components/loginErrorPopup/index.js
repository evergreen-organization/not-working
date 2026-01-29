import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'atoms';
import { styles } from './styles';
import { BaseModal } from 'molecules';

export const LoginErrorPopup = ({ testID, visible, title, message, onClose }) => {
	return (
		<BaseModal visible={visible} onBackdropPress={onClose}>
			<View testID={testID} style={styles.modalContainer}>
				{title && <Text style={styles.title}>{title}</Text>}
				<Text style={styles.modalText}>{message}</Text>
				<Button style={styles.modalButton} onPress={onClose}>
					<Text bold style={styles.modalButtonText}>
						OK
					</Text>
				</Button>
			</View>
		</BaseModal>
	);
};
