import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { Button, Text } from 'atoms';
import { BottomModal } from 'molecules';

import { styles } from './styles';

export const InvitationsReasonModal = ({ isVisible, closeModal, onSubmit }) => {
	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} avoidKeyboard>
			<SubmitForm onSubmit={onSubmit} />
		</BottomModal>
	);
};

const SubmitForm = ({ onSubmit }) => {
	const [reason, setReason] = useState('');
	const onChangeText = (text) => setReason(text);
	const onPress = () => {
		if (reason.length === 0) {
			return Alert.alert('Reason is required!');
		}
		if (reason.length > 100) {
			return Alert.alert('Maximum number of characters is 100!');
		}
		setReason('');
		onSubmit(reason);
	};

	return (
		<View style={styles.reasonModalContainer}>
			<Text variant={'P7'}>{'Late check in reason'}</Text>
			<View style={styles.inputContainer}>
				<TextInput multiline value={reason} onChangeText={onChangeText} style={styles.text} />
			</View>
			<Button title={'Submit'} onPress={onPress} typography={'P7'} />
		</View>
	);
};
