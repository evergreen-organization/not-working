import React from 'react';
import { TextInput, View } from 'react-native';
import { PrimaryButton, Text } from 'atoms';
import { BottomModal } from 'molecules';
import { styles } from './styles';

export const SelfServiceManualModal = ({
	isVisible,
	closeModal,
	ticketId,
	setTicketId,
	requestOTP,
}) => {
	return (
		<BottomModal avoidKeyboard isVisible={isVisible} onCancel={closeModal}>
			<View style={styles.container}>
				<Text variant={'P3'}>Ticket ID</Text>
				<View style={styles.inputContainer}>
					<TextInput value={ticketId} onChangeText={(e) => setTicketId(e)} style={styles.input} />
				</View>
				<View style={styles.button}>
					<PrimaryButton
						typography={'P7'}
						onPress={() => requestOTP(ticketId, 'm')}
						title={'Request OTP'}
					/>
				</View>
			</View>
		</BottomModal>
	);
};
