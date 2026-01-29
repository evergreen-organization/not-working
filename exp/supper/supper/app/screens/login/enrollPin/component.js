import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Loading, Screen, Text } from 'atoms';
import { PinInput } from 'organisms';

import { styles } from './styles';

const NEW_PIN_DISPLAY = 'Setup new PIN';
const CONFIRM_PIN_DISPLAY = 'Confirm PIN';

export const EnrollPinComp = ({
	handleChange,
	handleDelete,
	resetInput,
	errorMsg,
	newPin,
	confirmPin,
	loading,
}) => {
	return (
		<Screen testID={'enroll-pin-view'} singlePage>
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
			{loading && <Loading />}
		</Screen>
	);
};
