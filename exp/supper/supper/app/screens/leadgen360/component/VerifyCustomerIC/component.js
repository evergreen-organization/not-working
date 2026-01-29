import React from 'react';
import { Image, View } from 'react-native';
import { Form, FormButton, FormTextInput } from 'components';
import { Space } from 'atoms';
import InfoIcon from '../../../../assets/icon/info.png';

import { leadgen_testID } from '../../../../../e2e/testID';
import { checkICButtonStyle, ICValidationSchema, LOADING } from '../../utils';

import { styles } from './styles';
import { AnimatedScaleView } from 'molecules';

export const VerifyCustomerICComp = ({
	initialValues,
	onIcChange,
	onCheckIC,
	icStatus,
	onInfoPress,
}) => {
	return (
		<Form
			key={'icCheck'}
			initialValues={initialValues}
			validationSchema={ICValidationSchema}
			onSubmit={onCheckIC}
			enableReinitialize={true}
			enableScrollView={false}
			button={
				<View style={styles.view}>
					<FormButton
						testID={leadgen_testID.verifyICButton}
						title={checkICButtonStyle[icStatus].label}
						loading={icStatus === LOADING}
						condition={(values) => onIcChange(values.idNo)}
						color={checkICButtonStyle[icStatus].color}
						style={styles.formButton}
					/>
					<AnimatedScaleView onPress={onInfoPress} style={styles.infoButton}>
						<Image source={InfoIcon} style={styles.infoImage} />
					</AnimatedScaleView>
				</View>
			}
		>
			<View style={styles.icInputView}>
				<Space height={20} />
				<FormTextInput
					testID={leadgen_testID.icTextInput}
					name={'idNo'}
					label={'Identification No.'}
					subtitle={'NRIC / Old IC / Passport No.'}
					capitalise={true}
					maxLength={20}
					showCounter={true}
				/>
			</View>
		</Form>
	);
};
