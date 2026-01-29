import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'atoms';
import { styles } from './styles';
import { BaseModal } from 'molecules';

export const SecurePacDisplayView = ({ visible, signature, loading, onClose }) => {
	return (
		<BaseModal visible={visible} style={styles.container}>
			<View style={styles.view}>
				<Text>Your SecurePAC is</Text>
				<Text variant={'H3'} style={styles.pac}>
					{signature ?? ''}
				</Text>
				<Button title={'Done'} loading={loading} onPress={onClose} />
			</View>
		</BaseModal>
	);
};
