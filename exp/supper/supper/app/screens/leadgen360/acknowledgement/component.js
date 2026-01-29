import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';

import { Screen, Text } from 'atoms';
import { ButtonBottom, Header } from 'molecules';
import { PendingEConsent } from '../component';
import WarningLottie from 'assets/lottie/warning.json';
import ErrorLottie from 'assets/lottie/error.json';
import SuccessGif from 'assets/icon/success.gif';
import { Typography } from 'styles';
import { SUCCESS } from 'constant';

import { styles } from './styles';
import { leadgen_testID } from '../../../../e2e/testID';

export const LG360AcknowledgementScreen = ({
	handleDone,
	handleGoBack,
	name,
	addProspectResult,
	productExist,
	referralCode,
}) => {
	const renderStatus = () => {
		if (productExist) {
			return <DuplicateRecordView />;
		}
		if (referralCode) {
			return <PendingEConsent />;
		}
		if (addProspectResult !== SUCCESS) {
			return <ErrorView addProspectResult={addProspectResult} />;
		}
		return <SuccessView name={name} />;
	};
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={{
					text: name,
					style: Typography.H6,
				}}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.view}>{renderStatus()}</View>
			</ScrollView>
			<ButtonBottom testID={leadgen_testID.acknowledgementDoneButton} onPress={handleDone}>
				<Text style={styles.doneText}>Done</Text>
			</ButtonBottom>
		</Screen>
	);
};

const DuplicateRecordView = () => (
	<>
		<LottieView source={WarningLottie} style={styles.lottie} autoPlay />
		<Text variant={'P2'} style={styles.title}>
			Duplicate Record
		</Text>

		<Text variant={'P3'} style={styles.text}>
			Same Product / Service Interested Found in CRMA2.
		</Text>
		<Text variant={'P3'} style={styles.text}>
			Please select a different Product / Service in order to proceed.
		</Text>
	</>
);

const SuccessView = ({ name }) => (
	<>
		<Image source={SuccessGif} style={styles.lottie2} />
		<Text variant={'P4'} style={styles.title}>
			Success !
		</Text>
		<Text variant={'P3'} style={styles.text}>
			New prospect / product & service created for:
		</Text>
		<Text variant={'P2'} style={styles.title}>
			{name}
		</Text>
	</>
);

const ErrorView = ({ addProspectResult }) => (
	<>
		<LottieView source={ErrorLottie} style={styles.lottie} autoPlay />
		<Text variant={'P4'} style={styles.title}>
			Error
		</Text>
		<Text variant={'P2'} style={styles.text}>
			{addProspectResult}
		</Text>
	</>
);
