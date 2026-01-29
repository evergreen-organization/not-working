// QR Scanner
export const ERROR_WRONG_USER_ID = 'Invalid User ID';
export const ERROR_CAMERA_PERMISSION =
	'No camera permission. Please enable camera permission in the settings.';
export const ERROR_QR_CODE = 'Invalid QR Code.\nPlease try again with a valid QR Code.';
export const LBL_SCAN_2ND_QR_CODE = 'Please scan the second QR code';
export const QR_STEPS = {
	STEP1_SCANNING: 'Loading',
	STEP2_VALIDATE_QR: 'ValidateQR',
	STEP3_INFO_QR_2: 'Scan1QR',
	ERR_ID: 'Invalid ID',
	ERR_QR: 'Invalid QR',
	ERR_CAMERA: 'Invalid Camera',
	ERR_ACTIVATION: 'Invalid Activation',
	ERR_CANCELLED: 'Cancelled',
};

// MFA PIN
export const LBL_FORGET_PIN =
	'By selecting forgot PIN. PB SecureSign on your current device will be deactivated\n\n' +
	'Notes: Submit IUIA request to unbind PB SecureSign from your device. Then, proceed to perform PB SecureSign activation.';

export const LBL_UNBIND_DEVICE =
	'By unbinding your device. PB SecureSign on your current device will be deactivated.\n\n' +
	'Notes: Submit IUIA request to unbind PB SecureSign from your device. Then, proceed to perform PB SecureSign activation.';

export const PBSS_DEACTIVATED =
	'Your PB SecureSign has been deactivated. Submit IUIA request to unbind PB SecureSign from your device. Then, proceed to perform PB SecureSign activation.';
export const ACTIVATION_FAILED =
	'Activation Failed! Submit IUIA request to unbind PB SecureSign from your device.';

export const MFA_INTRO_DESCRIPTION = `In order to use OTP please activate your PB SecureSign. Please have your QR Code ready.\n
Retrieve activation QR via IAM portal\n(https://iam.pbb.my/portal)\nfor PB SecureSign activation.`;

export const DIGIPASS_ERROR = {
	PASSWORD_WRONG: '-4029', //
	PASSWORD_LOCK: '-4030', // Pin Locked
	STATUS_INVALID: '-4031', // Invalid Pin
};

export const MFA_CONFLICT_DESCRIPTION =
	'We have detected that your device is bound to a different AD ID, ' +
	'please login with the same AD ID to maintain your Activated PB SecureSign.\n\n' +
	'Warning: If you choose to continue, the PB SecureSign currently on your device will be deactivated.';

export const MFA_HAS_HARD_TOKEN_TITLE = 'Hard Token Detected';
export const MFA_HAS_HARD_TOKEN_DESCRIPTION =
	'We have detected that you have a hard token. To use PB SecureSign, you need to deactivate your hard token.\n\n' +
	'Notes: Submit IUIA request to deactivate Hard Token. Then, proceed to perform PB SecureSign activation.';

export const MFA_SUCCESS_TITLE = 'PB SecureSign Activated Successfully';
export const MFA_SUCCESS_DESCRIPTION =
	'PB SecureSign has been activated successfully. You are all set to explore the various features within our app.';
export const MFA_ERROR = {
	// generateSRPClientEphemeralKey errors
	ERROR_EPHEMERAL_GENERIC: 'M1000', // Generic Error
	ERROR_EPHEMERAL_DSAPP: 'M1001', // DSAPPClientError catch error
	// generateSRPSessionKey error
	ERROR_SRP_SESSION_GENERIC: 'M1100', // Generic Error
	ERROR_SRP_SESSION_DSAPP: 'M1101', // DSAPPClientError catch error
	// verifySRPServerEvidenceMessage error
	ERROR_VERIFY_SRP_SESSION_GENERIC: 'M1200', // Generic Error
	ERROR_VERIFY_SRP_SESSION_DSAPP: 'M1201', // DSAPPClientError catch error
	// decryptSRPData error
	ERROR_DECRYPT_SRP_DATA_GENERIC: 'M1300',
	ERROR_DECRYPT_SRP_DATA_DSAPP: 'M1301',
	// parseSecureChannelMessage error
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_GENERIC: 'M1400',
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_PARSE_CHANNEL: 'M1402',
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_DIGI_FINGERPRINT: 'M1403',
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_MULTI_ACTIVATE: 'M1404',
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_STORAGE_FINGEPRINT: 'M1405',
	ERROR_PARSE_SECURE_CHANNEL_MESSAGE_WRITE_STORAGE: 'M1406',
	// verifySRPMAC error
	ERROR_VERIFY_SRP_GENERIC: 'M1500', // Generic Error
	ERROR_VERIFY_SRP_DSAPP: 'M1501', // DSAPPClientError catch error
	// Scanner error
	ERROR_SCANNER_GENERIC: 'M1600', // Generic Error
	// parseSecureChannelMessagePostInit
	ERROR_POST_INIT_GENERIC: 'M1700', // Generic Error
	ERROR_POST_INIT_PARSE_CHANNEL: 'M1701', // Parse Channel Error
	ERROR_POST_INIT_STORAGE_FINGERPRINT: 'M1702', // Storage Fingerprint Error
	ERROR_POST_INIT_GET_STORAGE: 'M1703', // Get Storage Error
	ERROR_POST_INIT_GET_VECTOR: 'M1704', // Get Vector Error
	ERROR_POST_INIT_DIGI_FINGERPRINT: 'M1705', // Digi Fingerprint
	ERROR_POST_INIT_MULTI_ACTIVATE: 'M1706', // Multi Activate Error
	ERROR_POST_INIT_WRITE_STORAGE: 'M1707', // Write Storage Error
	ERROR_POST_INIT_GET_VECTOR_2: 'M1708', // Get Vector Error
	ERROR_POST_INIT_GENERATE_SIGNATURE: 'M1709', // Generate Signature Error
	ERROR_POST_INIT_WRITE_STORAGE_2: 'M1710', // Write Storage Error
	ERROR_POST_INIT_GET_VECTOR_3: 'M1711', // Get Storage Error
	ERROR_POST_INIT_DIGI_PROPERTIES: 'M1712', // Digi Properties Error
	// activateBiometric
	ERROR_ACTIVATE_BIOMETRIC_GENERIC: 'M1800', // Generic Error
	ERROR_ACTIVATE_BIOMETRIC_ENCRYPT: 'M1801', // DSAPPClientError catch error
	ERROR_ACTIVATE_BIOMETRIC_STORAGE_FINGERPRINT: 'M1802', // Get Vector Error
	ERROR_ACTIVATE_BIOMETRIC_GET_BIOMETRY: 'M1803', // Generate Signature Error
	ERROR_ACTIVATE_BIOMETRIC_WRITE_STORAGE: 'M1804', // Write Storage Error
	// Delete Secure Storage
	ERROR_DELETE_SECURE_STORAGE_GENERIC: 'M1900', // Generic Error
	// Delete Biometric Storage
	ERROR_DELETE_BIOMETRIC_STORAGE_GENERIC: 'M2000', // Generic Error
	// Generate OTP
	ERROR_OTP_GENERIC: 'M2100', // Generic Error
	ERROR_OTP_STORAGE: 'M2101', // Storage Fingerprint Error
	ERROR_OTP_DIGIPASS: 'M2102', // Digi Fingerprint Error
	ERROR_OTP_GET_VECTOR: 'M2103', // Get Vector Error
	ERROR_OTP_PASSWORD: 'M2104', // Password Error
	ERROR_OTP_GENERATE: 'M2105',
	ERROR_OTP_WRITE_STORAGE: 'M2106',
	// signOASTransaction
	ERROR_SIGN_GENERIC: 'M2200',
	ERROR_SIGN_STORAGE: 'M2201',
	ERROR_SIGN_DIGIPASS: 'M2202',
	ERROR_SIGN_STORAGE_INSTANCE: 'M2203',
	ERROR_SIGN_GET_VECTOR: 'M2204',
	ERROR_SIGN_GENERATE_SIGNATURE: 'M2205',
	ERROR_SIGN_WRITE_STORAGE: 'M2206',
	ERROR_SIGN_DIGIPASS_PROPERTIES: 'M2207',
	ERROR_SIGN_GENERATE_MESSAGE: 'M2208',
	// changePin
	ERROR_CHANGE_PIN_GENERIC: 'M2300', // Generic Error
	ERROR_CHANGE_PIN_STORAGE: 'M2301', // Storage Fingerprint Error
	ERROR_CHANGE_PIN_DIGIPASS: 'M2302', // Digi Fingerprint Error
	ERROR_CHANGE_PIN_GET_VECTOR: 'M2303', // Get Vector Error
	ERROR_CHANGE_PIN_CHANGE_PASSWORD: 'M2304', // Write Storage Error
	ERROR_CHANGE_PIN_WRITE_STORAGE: 'M2305',
	// onBiometric
	ERROR_BIOMETRIC_GENERIC: 'M2400', // Generic Error
	ERROR_BIOMETRIC_STORAGE: 'M2401', // Storage Fingerprint Error
	ERROR_BIOMETRIC_GET_TOKEN_PIN: 'M2402', // Get token pin error
	ERROR_BIOMETRIC_DECRYPT_PIN: 'M2403', // Write Storage Error
	// QR scanner
	ERROR_QR_GENERIC: 'M2500', // Generic Error
	ERROR_QR_SCANNER: 'M2501', // Scanning Error
	ERROR_QR_PARSING: 'M2502', // Parse Channel Error
};

export const BIO_CONSTANT = 'bio';
