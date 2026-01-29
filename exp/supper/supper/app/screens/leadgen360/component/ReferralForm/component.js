import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';
import { Text, TextHelper } from 'atoms';
import { BottomModal } from 'molecules';
import { FormDropDown, FormFieldWithButton, FormPicker } from 'components';
import { LOADING } from 'constant';
import { REFERRAL_BRANCH_LABEL, REFERRAL_BRANCH_VALUE } from '../../utils';
import { styles } from './styles';
import { leadgen_testID } from '../../../../../e2e/testID';
import { commonStyles } from 'styles';

export const ReferralFormView = (
	{
		handleModalOpen,
		handleModalConfirm,
		handleModalCancel,
		handleCheckReferral,
		handleSelectReferralBranch,
		referralStaffBranchFormName,
		referralStaffNoFormName,
		visible,
		referral,
		sortedRegionBranch,
		status,
		searchedReferral,
	},
	ref,
) => {
	const { regBrDeptName, isEditable, name: staffName, designation } = searchedReferral || {};
	const formikContext = useFormikContext();
	const { touched, errors } = formikContext;

	const renderReferralBranch = () => {
		/* regionBranch found and not editable */
		if (!!regBrDeptName && !isEditable) {
			return <ReferralDetailItem title={'Staff Region/Branch/Department'} value={regBrDeptName} />;
		}
		return (
			<FormPicker
				testID={leadgen_testID.referralBranch}
				name={referralStaffBranchFormName}
				label={'Staff Region/Branch/Department'}
				data={sortedRegionBranch}
				dataLabel={REFERRAL_BRANCH_LABEL}
				dataValue={REFERRAL_BRANCH_VALUE}
				onSelect={handleSelectReferralBranch}
				enableSearch
				formikContext={formikContext}
			/>
		);
	};

	return (
		<View>
			<FormDropDown
				name={referralStaffNoFormName}
				formikContext={formikContext}
				label={'Referral Information'}
				onFormPickerPress={handleModalOpen}
				value={referral?.staffNo ? `${referral?.staffNo} ${referral?.name}` : 'Tap to input'}
				testID={leadgen_testID.referralButton}
				renderModal={
					<BottomModal
						fullHeight
						ref={ref}
						testID={leadgen_testID.referralBottomModal}
						isVisible={visible}
						onCancel={handleModalCancel}
						onConfirm={handleModalConfirm}
					>
						<View style={[commonStyles.fill]}>
							<Text variant={'P6'} style={styles.titleText}>
								Referral Information
							</Text>
							<View style={styles.bottomView}>
								<FormFieldWithButton
									testID={leadgen_testID.referralID}
									name={referralStaffNoFormName}
									label={'Staff ID'}
									buttonTitle={'Check'}
									handleSelect={handleCheckReferral}
									maxLength={5}
									loading={status === LOADING}
									mandatory={true}
									formikContext={formikContext}
								/>
								<ReferralDetailItem title={'Staff Name'} value={staffName} />
								<ReferralDetailItem title={'Staff Designation'} value={designation} />
								{renderReferralBranch()}
							</View>
						</View>
					</BottomModal>
				}
			/>
			{touched[referralStaffBranchFormName] && (
				<TextHelper
					isValid={!errors[referralStaffBranchFormName]}
					errorMsg={errors[referralStaffBranchFormName]}
				/>
			)}
		</View>
	);
};

export default forwardRef(ReferralFormView);

const ReferralDetailItem = ({ title, value }) => (
	<View style={{ marginVertical: 10 }}>
		<Text variant={'P7'}>{title}</Text>
		<View style={styles.textContainer}>
			<Text variant={'P6'} style={styles.text}>
				{value}
			</Text>
		</View>
	</View>
);
