import React from 'react';
import Moment from 'moment';

import { Screen, Space } from 'atoms';
import { FormCalendarModal, FormPicker, FormTextInput } from 'components';
import Form from '../../../components/forms/Form';
import { colors } from 'configs';
import { LOADING } from 'constant';

import {
	BRANCH_LABEL,
	BRANCH_VALUE,
	getReportingStartEndDate,
	newLeadDetailsValidationSchema,
} from '../utils';
import { ReferralForm, SalesPersonnelForm, FormSubmitButton } from '../component';
import { styles } from './styles';
import { leadgen_testID } from '../../../../e2e/testID';
import { Header } from 'molecules';
import { KeyboardAvoidingView } from 'react-native';

export const LG360DetailsFormScreen = ({
	handlePreferredBranchSelected,
	handleSubmit,
	initialValues,
	name,
	sortedBranches,
	customerAliasId,
	status,
	salesPersonnelDisabled,
}) => {
	const { startDate, endDate } = getReportingStartEndDate(Moment().toDate());

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: name,
				}}
			/>
			<Form
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={newLeadDetailsValidationSchema}
				button={<FormSubmitButton customerAliasId={customerAliasId} loading={status === LOADING} />}
			>
				<KeyboardAvoidingView
					behavior="position"
					style={{ paddingHorizontal: 20 }}
					keyboardVerticalOffset={100}
				>
					<FormTextInput
						name={'productName'}
						label={'Product & Service Interested'}
						mandatory={true}
						textInputStyle={{ color: colors.shadow }}
						editable={false}
					/>
					<FormCalendarModal
						label="Date Interested"
						name="dateInterested"
						minimumDate={startDate}
						maximumDate={endDate}
						mandatory={true}
						pastScrollRange={0}
						futureScrollRange={0}
						dateFormat={'DD/MM/YYYY'}
					/>
					<Space height={10} />
					<FormPicker
						testID={leadgen_testID.branchPicker}
						name={'brDeptCode'}
						label={'Preferred Branch'}
						data={sortedBranches}
						dataLabel={BRANCH_LABEL}
						dataValue={BRANCH_VALUE}
						mandatory={true}
						onSelect={handlePreferredBranchSelected}
						enableSearch
					/>
					<Space height={10} />
					<SalesPersonnelForm
						name={'salesPersonStaffNo'}
						label={'Preferred Sales Personnel'}
						dependentName={'brDeptCode'}
						disabled={salesPersonnelDisabled}
					/>
					<Space height={10} />
					<ReferralForm
						referralStaffNoFormName={'referralStaffNo'}
						referralStaffBranchFormName={'referralBranchDeptCode'}
					/>

					<Space height={10} />
					<FormTextInput
						testID={leadgen_testID.remarks}
						name={'remarks'}
						label={'Remarks'}
						maxLength={250}
						showCounter={true}
						numberOfLines={3}
						multiline={true}
						textInputStyle={styles.remarkTextInput}
					/>
					<Space height={20} />
				</KeyboardAvoidingView>
			</Form>
		</Screen>
	);
};
