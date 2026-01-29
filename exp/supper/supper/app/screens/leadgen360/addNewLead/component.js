import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Screen, Text } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';

import { ProspectInfoForm, VerifyCustomerIC } from '../component';
import { styles } from './styles';
import { FOUND } from '../utils';
import { leadgen_testID } from '../../../../e2e/testID';

const states = {
	default: 'default',
	noIC: 'noIC',
	icChecked: 'icCheck',
};

export const LG360NewLeadScreen = ({
	handleHeaderLeftBtn,
	handleCheckIc,
	handleIcChange,
	handleSubmit,
	handleNoICPress,
	getLeadInitialValues,
	icStatus,
	icFormInitialValues,
	products,
	viewState,
}) => {
	const renderProspectForm = () => {
		if (viewState === states.noIC) {
			return (
				<ProspectInfoForm
					editable={true}
					initialValues={getLeadInitialValues()}
					products={products}
					onSubmit={handleSubmit}
				/>
			);
		}
		if (viewState === states.icChecked) {
			return (
				<>
					<VerifyCustomerIC
						initialValues={icFormInitialValues}
						onCheckIC={handleCheckIc}
						onIcChange={handleIcChange}
						icStatus={icStatus}
					/>
					<ProspectInfoForm
						editable={icStatus !== FOUND}
						initialValues={getLeadInitialValues()}
						products={products}
						onSubmit={handleSubmit}
					/>
				</>
			);
		}
		return (
			<>
				<VerifyCustomerIC
					initialValues={icFormInitialValues}
					onCheckIC={handleCheckIc}
					onIcChange={handleIcChange}
					icStatus={icStatus}
				/>
				<TouchableOpacity
					testID={leadgen_testID.skipICButton}
					onPress={handleNoICPress}
					style={styles.skipIcButton}
				>
					<Text variant={'P3'} style={styles.skipText}>
						Skip And Proceed Without ID Number
					</Text>
				</TouchableOpacity>
			</>
		);
	};
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Add New Prospect',
					style: Typography.H6,
				}}
			/>
			<View style={styles.flex}>
				<View style={styles.background}>{renderProspectForm()}</View>
			</View>
		</Screen>
	);
};

LG360NewLeadScreen.states = states;
