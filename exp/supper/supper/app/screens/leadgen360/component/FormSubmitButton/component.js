import React from 'react';
import { View } from 'react-native';
import { BottomView, PrimaryButton } from 'atoms';
import { Alert } from 'molecules';
import { colors } from 'configs';
import { styles } from './styles';
import { leadgen_testID } from '../../../../../e2e/testID';

export const FormSubmitButtonView = ({
	handleReset,
	handleCreate,
	handleClose,
	handleConfirm,
	isModalVisible,
	loading,
}) => {
	const createButtonColor = loading ? colors.medium : colors.primary;

	return (
		<>
			<BottomView>
				<View style={styles.view}>
					<PrimaryButton
						onPress={handleReset}
						buttonStyle={styles.cancelButton}
						shadowColor={colors.medium}
						title="Clear"
						titleStyle={styles.clearText}
						isTitleBold
					/>
					<PrimaryButton
						testID={leadgen_testID.submitButton}
						onPress={handleCreate}
						disabled={loading}
						shadowColor={createButtonColor}
						buttonStyle={[{ backgroundColor: createButtonColor }]}
						title="Create"
						titleStyle={styles.createText}
						isTitleBold
					/>
				</View>
			</BottomView>
			<Alert
				title={'Confirmation'}
				description={'Proceed with prospect / product & service creation?'}
				confirmButtonTitle={'Confirm'}
				cancelButtonTitle={'Cancel'}
				onConfirm={handleConfirm}
				onClose={handleClose}
				isVisible={isModalVisible}
			/>
		</>
	);
};
