import React from 'react';
import { View } from 'react-native';
import { Text } from 'atoms';
import { BottomModal } from 'molecules';
import { FormFieldWithButton } from 'components';
import { styles } from './styles';
import { leadgen_testID } from '../../../../../e2e/testID';
import { useFormikContext } from 'formik';

export const OthersSalesPersonnel = ({
	visible,
	onCloseModal,
	onConfirmModal,
	onSearchSalesPersonnel,
	searchedStaff,
	loading,
}) => {
	const formikContext = useFormikContext();

	return (
		<BottomModal
			fullHeight
			testID={leadgen_testID.searchOthersSalesPersonnel}
			isVisible={visible}
			onCancel={onCloseModal}
			onConfirm={onConfirmModal}
		>
			<View style={styles.bottomView}>
				<FormFieldWithButton
					testID={leadgen_testID.salesPersonID}
					name={'salesPersonnelID'}
					label={'Sales Personnel ID'}
					buttonTitle={'Check'}
					handleSelect={onSearchSalesPersonnel}
					maxLength={5}
					loading={loading}
					formikContext={formikContext}
				/>
				<View style={{ marginVertical: 10 }}>
					<Text bold style={{ fontSize: 14 }}>
						Sales Personnel Name
					</Text>
					<View style={styles.textContainer}>
						<Text style={styles.text}>
							{searchedStaff.name ? searchedStaff.staffNo + ' ' + searchedStaff.name : null}
						</Text>
					</View>
				</View>
			</View>
		</BottomModal>
	);
};
