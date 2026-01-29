import React from 'react';
import { BottomModal } from 'molecules';
import { Image, TouchableOpacity, View } from 'react-native';
import CloseIcon from 'assets/icon/close.png';
import { Text } from 'atoms';
import { TextInput } from 'organisms';
import { styles } from './styles';

export const SecurePacInputView = ({
	visible,
	closeModal,
	signature,
	error,
	onSecurePacChanged,
	securePac,
}) => {
	return (
		<BottomModal showLine={false} isVisible={visible} closeModal={closeModal} avoidKeyboard>
			<TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
				<Image source={CloseIcon} style={styles.cancelIcon} />
			</TouchableOpacity>
			<View style={styles.titleView}>
				<View style={[styles.container]}>
					<Text style={styles.subtitle} variant={'P9'}>
						{'Please enter'}
					</Text>
					<Text style={styles.heading} variant={'P10'}>
						{'Secure PAC'}
					</Text>
				</View>
				<View style={styles.pacView}>
					<Text variant={'H3'} style={styles.pacText}>
						{signature ?? ''}
					</Text>
				</View>
			</View>
			{error !== null && <Text style={styles.errorText}>{error}</Text>}
			<View style={styles.inputView}>
				<TextInput
					bold
					onChangeText={onSecurePacChanged}
					value={securePac}
					maxLength={6}
					style={styles.input}
				/>
			</View>
		</BottomModal>
	);
};
