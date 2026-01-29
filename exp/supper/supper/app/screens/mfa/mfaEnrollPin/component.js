import React from 'react';
import { Loading, Screen, Text } from 'atoms';
import { TouchableOpacity, View } from 'react-native';
import { PinInput } from 'organisms';

import { styles } from './styles';
import { Header } from 'molecules';

const NEW_PIN_DISPLAY = 'Setup new PIN';
const CONFIRM_PIN_DISPLAY = 'Confirm PIN';

export const MFAEnrollPinComp = ({
	handleHeaderLeftBtn,
	handleChange,
	handleDelete,
	resetInput,
	errorMsg,
	newPin,
	confirmPin,
	isLoading,
}) => {
	return (
		<Screen singlePage>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
			/>
			<View style={styles.container}>
				<PinInput
					title={newPin?.length < 6 ? NEW_PIN_DISPLAY : CONFIRM_PIN_DISPLAY}
					value={newPin?.length < 6 ? newPin : confirmPin}
					onChange={handleChange}
					errorTitle={errorMsg}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={resetInput}>
					<Text variant={'H4'}>Clear</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleDelete}>
					<Text variant={'H4'}>Delete</Text>
				</TouchableOpacity>
			</View>
			{isLoading && <Loading />}
		</Screen>
	);
};
