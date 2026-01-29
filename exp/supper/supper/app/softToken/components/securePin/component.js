import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import CloseIcon from 'assets/icon/close.png';
import { NumpadSmall } from 'organisms';
import { Loading, PinHash, Text } from 'atoms';
import { BottomModal } from 'molecules';
import { styles } from './styles';

export const SecurePinView = ({
	handleChange,
	handleDelete,
	onBiometric,
	onCancel,
	pinLoading,
	pin,
	pinError,
	modalPinVisible,
}) => {
	const renderErrorMsg = () => {
		if (pinError) {
			return <Text style={styles.errorText}>{pinError}</Text>;
		}
	};

	return (
		<BottomModal isVisible={modalPinVisible} onClose={onCancel} showLine={false}>
			<TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
				<Image source={CloseIcon} style={styles.icon} />
			</TouchableOpacity>
			<View style={styles.titleContainer}>
				<View style={styles.pinView}>
					{renderErrorMsg()}
					<Text style={styles.title}>{'Enter PIN to continue'}</Text>
				</View>
				<PinHash pin={pin} />
			</View>
			<NumpadSmall onPress={handleChange} onDelete={handleDelete} onBiometric={onBiometric} />
			{pinLoading && <Loading />}
		</BottomModal>
	);
};
