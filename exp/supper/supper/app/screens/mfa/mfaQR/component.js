import React from 'react';
import LoadingLottie from 'assets/lottie/loading.json';
import QRImage from 'assets/images/qr-code-storyset.png';

import { Screen } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import { LBL_SCAN_2ND_QR_CODE, QR_STEPS } from '../constants';
import { MFAQRError } from './MFAQRError';
import { MFAQRInfo } from './MFAQRInfo';
import { MFAQRInfoLottie } from './MFAQRInfoLottie';

export const MfaQRComp = ({
	handleRetry,
	handleHeaderLeftBtn,
	handleScan2ndQR,
	step,
	errorMessage,
}) => {
	const renderScreen = () => {
		if (
			step === QR_STEPS.ERR_ACTIVATION ||
			step === QR_STEPS.ERR_ID ||
			step === QR_STEPS.ERR_QR ||
			step === QR_STEPS.ERR_CAMERA ||
			step === QR_STEPS.ERR_CANCELLED
		) {
			return (
				<MFAQRError
					errorMessage={errorMessage}
					onPress={handleRetry}
					buttonTitle={'Scan QR again'}
				/>
			);
		}
		if (step === QR_STEPS.STEP3_INFO_QR_2) {
			return (
				<MFAQRInfo
					description={LBL_SCAN_2ND_QR_CODE}
					image={QRImage}
					buttonTitle={'Scan QR'}
					onPress={handleScan2ndQR}
				/>
			);
		}
		return <MFAQRInfoLottie lottie={LoadingLottie} description={'Loading'} />;
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
					text: 'Scan QR',
					style: Typography.H6,
				}}
			/>
			{renderScreen()}
		</Screen>
	);
};
