import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import { MfaQRComp } from './component';
import { algorithm, checkCameraPermission } from 'utils';
import { activateOASSoftToken, destroyPBSSToken, mfaQRScan } from 'softToken';
import { routes } from 'navigations';
import { mergeQRData, validateQRFull, validateQRID } from '../utils';
import {
	ERROR_CAMERA_PERMISSION,
	ERROR_QR_CODE,
	ERROR_WRONG_USER_ID,
	QR_STEPS,
} from '../constants';

export const MfaQR = ({ navigation, route }) => {
	const urName = route?.params?.urName;
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = React.useState('');
	const [step, setStep] = React.useState(QR_STEPS.STEP1_SCANNING);
	let firstQR = useRef();

	useEffect(() => {
		destroyPBSSToken(dispatch).then();
		openQR().then();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openQR = async () => {
		// Check if camera permission is available
		const cameraPermission = await checkCameraPermission();
		if (!cameraPermission) {
			setStep(QR_STEPS.ERR_CAMERA);
			setErrorMessage(ERROR_CAMERA_PERMISSION);
			return;
		}

		// Scan QR Code with OneSpan SDK
		const result = await mfaQRScan();
		// cancelled QR Code
		if (result?.status === 'C') {
			setStep(QR_STEPS.ERR_CANCELLED);
			navigation.goBack();
			return;
		}
		// Invalid QR Code
		if (result?.status !== 'S') {
			setErrorMessage(
				`${ERROR_QR_CODE}\n(${result.status}:${result.errorCode})\n\nServer Message:${result.message}`,
			);
			setStep(QR_STEPS.ERR_QR);
			return;
		}

		// Validate if QR Code matches ADID
		setStep(QR_STEPS.STEP2_VALIDATE_QR);
		let validQR = validateQRID({ qrId: result?.data?.userId, urName });
		if (!validQR) {
			setStep(QR_STEPS.ERR_QR);
			setErrorMessage(ERROR_WRONG_USER_ID);
			return;
		}

		let QRCodeTemp = result.data;
		if (step === QR_STEPS.STEP3_INFO_QR_2) {
			QRCodeTemp = mergeQRData({
				firstQR: firstQR.current,
				secondQR: result.data,
			});
		}

		const isQRComplete = validateQRFull({ ...QRCodeTemp });
		// if complete then request to Scan 2nd part QR Code
		if (!isQRComplete) {
			// If there's partial QR code then QR Code is 2 part error.
			firstQR.current = result.data;
			setStep(QR_STEPS.STEP3_INFO_QR_2);
			return;
		}

		// Activate OASoft Token
		const { regID, actPwd, userId } = QRCodeTemp;
		let adid = userId.slice(0, userId.length - 4);
		let domain = userId.slice(userId.length - 3, userId.length);
		const staffNo = algorithm.toStaffNo(adid);
		const deviceId = await DeviceInfo.getUniqueId();
		const {
			status,
			data,
			errorCode,
			errorMessage: aErrorMessage,
		} = await activateOASSoftToken({
			registrationId: regID,
			deviceId,
			staffNo,
			activationPassword: actPwd,
			dispatch,
		});
		if (status !== 'S') {
			setErrorMessage(`${ERROR_QR_CODE}\n\n${status}-${errorCode}:${aErrorMessage}`);
			setStep(QR_STEPS.ERR_ACTIVATION);
			return;
		}
		navigation.replace(routes.MFA_ENROLL_PIN, {
			data: { ...data, adid, domain },
		});
	};

	const handleHeaderLeftBtn = () => navigation.goBack();

	const handleRetry = () => {
		setStep(QR_STEPS.STEP1_SCANNING);
		setErrorMessage('');
		openQR().then();
	};

	const handleScan2ndQR = () => {
		openQR().then();
	};

	const props = {
		handleRetry,
		handleHeaderLeftBtn,
		handleScan2ndQR,
		errorMessage,
		step,
	};

	return <MfaQRComp {...props} />;
};
