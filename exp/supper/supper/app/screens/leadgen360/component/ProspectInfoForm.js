import React from 'react';
import { AvoidKeyboard, Space } from 'atoms';
import { Form, FormTextInput, FormButtonBottom } from 'components';
import { FormProductPicker } from './FormProductPicker';
import { leadgen_testID } from '../../../../e2e/testID';
import {
	leadCheckValidationSchema,
	PRODUCT_LABEL,
	PRODUCT_VALUE,
} from '../utils';
import Animated, { SlideInUp } from 'react-native-reanimated';

export const ProspectInfoForm = ({
	initialValues,
	products,
	onSubmit,
	editable,
}) => {
	return (
		<AvoidKeyboard>
			<Form
				key={'productCheck'}
				initialValues={initialValues}
				validationSchema={leadCheckValidationSchema}
				enableReinitialize={true}
				// enableScrollView={false}
				onSubmit={onSubmit}
				button={
					<FormButtonBottom
						testID={leadgen_testID.addNewLeadButton}
						title={'Next'}
					/>
				}
			>
				<Animated.View entering={SlideInUp} style={{ paddingHorizontal: 20 }}>
					<Space height={30} />
					<FormTextInput
						testID={leadgen_testID.textInputName}
						editable={editable}
						name={'name'}
						label={'Customer Name'}
						mandatory={true}
						showCounter={true}
						maxLength={50}
						capitalise={true}
					/>
					<FormTextInput
						testID={leadgen_testID.textInputContactNumber}
						name={'contactNo'}
						label={'Contact No.'}
						mandatory={true}
						showCounter={true}
						maxLength={15}
					/>
					<FormProductPicker
						label={'Products & Services Interested'}
						name={'productInterested'}
						dataValue={PRODUCT_VALUE}
						dataLabel={PRODUCT_LABEL}
						data={products}
					/>
				</Animated.View>
			</Form>
		</AvoidKeyboard>
	);
};
