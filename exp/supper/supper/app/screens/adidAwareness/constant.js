import React from 'react';
import { FaqDetail } from './components/FaqDetail';
import { colors } from 'configs';
import Browser from 'assets/adid/browser.png';
import IAMPortal from 'assets/adid/IAMPortal.png';
import IAMLogin from 'assets/adid/IAMLogin.png';
import IAM_Challenge_Question from 'assets/adid/IAM_Challenge_Question.png';
import PBx_Login from 'assets/adid/PBx_Login.png';
import ProfileGuide from 'assets/adid/ProfileGuide.png';
import Challenge_Question_Image from 'assets/adid/Challenge_Question_Image.png';
import Enter_IC_Image from 'assets/adid/Enter_IC_Image.png';
import IAM_Notif from 'assets/adid/IAM_Notif.png';
import Secure_Sign_Image from 'assets/adid/Secure_Sign_Image.png';
import Forgot_Pin from 'assets/adid/ForgotPin.png';
import Forgot_Pin_Alert from 'assets/adid/ForgotPinAlert.png';
import ADLogin from 'assets/adid/AdLogin.png';
import Set_Up_Pin from 'assets/adid/SetUpPin.png';
import SelfServiceProfile from 'assets/adid/SelfServieProfile.png';
import SelfServiceOptions from 'assets/adid/SelfServiceOptions.png';
import ResetButton from 'assets/adid/ResetButton.png';
import SetPassword from 'assets/adid/SetPassword.png';
import SecurePin from 'assets/adid/SecurePin.png';
import ResetSuccess from 'assets/adid/ResetSuccess.png';
import UnlockButton from 'assets/adid/AdUnlockButton.png';
import UnlockSuccess from 'assets/adid/UnlockSuccess.png';

const SET_UP_CHALLENGE_QUESTIONS = [
	{
		name: '1',
		image: Browser,
		title: 'Step 1: Open Google Chrome or Microsoft Edge Browser from your work computer.',
		details: <FaqDetail text={'Note: You must be at the office to do this!'} />,
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: IAMPortal,
		title: 'Step 2: Open the Identity & Access Management (IAM) Portal.',
		details: (
			<FaqDetail
				text={
					'Go to “PBB Bookmarks” and select “IAM Portal”.\n\nAlternatively, you may type the URL directly in the browser https://iam.pbb.my/portal'
				}
				specialKey={'https'}
				color={'#0066FF'}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '3',
		image: IAMLogin,
		title: 'Step 3: Login to the IAM portal using your AD ID username and password.',
		details: (
			<FaqDetail
				text={
					'Hint: AD ID username and password is the username and password you use to login into your work computer windows.\n\n' +
					'Make sure to check that your AD ID username and password is active / not locked'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '4',
		image: IAM_Challenge_Question,
		title: 'Step 4: Enrol your 3 Challenge Questions (CQ)',
		details: (
			<FaqDetail
				text={
					'Note: Questions cannot be the same. Answers must have a minimum of 3 characters, and answers provided cannot be duplicated.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
];

export const ACTIVATE_SECURE_SIGN = [
	{
		name: '1',
		image: PBx_Login,
		title: 'Step 1: Login to your PBeXperience Mobile App',
		details: (
			<FaqDetail
				text={
					'Note: Make sure you have downloaded or updated to the latest version of PBeXperience!\n\nYou must have a valid AD ID (not locked) in order to log in.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: ProfileGuide,
		title: 'Step 2: Set up your new SecurePIN',
		details: (
			<FaqDetail
				text={
					'If you have already successfully enroled your Challenge Questions, the app will automatically prompt you to set up your SecurePIN.\n\n' +
					'You can also go to "Profile" > "Self Service" , and set up your new PIN by selecting Reset Password under "Active Directory"'
				}
				specialKey={'"'}
				color={colors.primary}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '3',
		image: Challenge_Question_Image,
		title: 'Step 3: Fill in the answers to your Challenge Questions',
		details: (
			<FaqDetail
				text={
					'You must answer all 3 questions correctly.\n\n' +
					'Upon successful enrolment, the message “PIN enroled Successfully” will be displayed.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '4',
		image: Enter_IC_Image,
		title: 'Step 4: Input your NRIC Number',
		details: (
			<FaqDetail
				text={
					'Note: PB SecureSign is currently only available for staff who have a valid NRIC number only. '
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '5',
		image: IAM_Notif,
		title: 'Step 5: Input Activation Password',
		details: (
			<FaqDetail
				text={
					'Note: Return / go back to your IAM portal on your work computer to retrieve the 6 digit activation password. Click on the “Notifications” icon. '
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '6',
		image: Secure_Sign_Image,
		title: 'Step 6: PB SecureSign Activated!',
		details: (
			<FaqDetail
				text={
					'Upon successfully entering the correct password retrieved from the IAM portal, your PB SecureSign will be successfully activated!\n\nYou did it!'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
];

const FORGOT_SECURE_PIN = [
	{
		name: '1',
		image: PBx_Login,
		title: 'Step 1: Open your PBeXperience mobile app and tap “Login”.',
		details: (
			<FaqDetail
				text={
					'Note: Make sure you have downloaded the latest version of PBeXperience or updated to the latest version.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: Forgot_Pin,
		title: 'Step 2: “Tap on Forgot PIN”',
		details: (
			<FaqDetail
				text={
					'You must have a valid AD ID (not locked) in order to log in and reset your SecurePIN.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '3',
		image: Forgot_Pin_Alert,
		title: 'Step 3: When prompted to confirm, tap “OK”.',
		details: (
			<FaqDetail
				text={'If you didn’t forget your PIN, you can tap “CANCEL” to close the confirmation box.'}
			/>
		),
		conditionalNavigation: () => {},
	},
	{
		name: '4',
		image: ADLogin,
		title: 'Step 4: Proceed to login with your AD ID username and password',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '5',
		image: Challenge_Question_Image,
		title: 'Step 5: Fill in the answers to your Challenge Questions',
		details: <FaqDetail text={'You must answer all 3 questions correctly.'} />,
		conditionalNavigation: () => {},
	},
	{
		name: '6',
		image: Set_Up_Pin,
		title: 'Step 6: Set up your new SecurePIN',
		details: (
			<FaqDetail
				text={
					'Then confirm your PIN.\n\nLastly, confirm your identity via biometric authentication and you’re all done!'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
];

const FIND_AD_RESET = [
	{
		name: '1',
		image: SelfServiceProfile,
		title: 'Step 1: Go to “Profile” and tap on “Self Service”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: SelfServiceOptions,
		title: 'Step 2: Tap on either “Reset Password” or “Unlock ID”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
];

const HOW_AD_RESET = [
	{
		name: '1',
		image: SelfServiceProfile,
		title: 'Step 1: Go to “Profile” and tap on “Self Service”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: ResetButton,
		title: 'Step 2: Tap on “Reset Password”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '3',
		image: SetPassword,
		title: 'Step 3: Input your new password and confirm it.',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '4',
		image: Challenge_Question_Image,
		title: 'Step 4: Answer your 3 Challenge Questions',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '5',
		image: SecurePin,
		title: 'Step 5: Enter your SecurePIN or biometric verification',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '6',
		image: ResetSuccess,
		title: 'Step 6: Password successfully reset!',
		details: (
			<FaqDetail
				text={
					'Note: Please wait for approximately 15 minutes before attempting to log in to your computer after resetting your AD ID password.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
];

const UNLOCK_AD = [
	{
		name: '1',
		image: SelfServiceProfile,
		title: 'Step 1: Go to “Profile” and tap on “Self Service”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '2',
		image: UnlockButton,
		title: 'Step 2: Tap on “Unlock ID”',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '3',
		image: Challenge_Question_Image,
		title: 'Step 3: Answer your 3 Challenge Questions',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '4',
		image: SecurePin,
		title: 'Step 4: Enter your SecurePIN or biometric verification',
		details: <FaqDetail text={''} />,
		conditionalNavigation: () => {},
	},
	{
		name: '5',
		image: UnlockSuccess,
		title: 'Step 5: AD ID successfully unlocked!',
		details: (
			<FaqDetail
				text={
					'Note: Please wait for approximately 15 minutes before attempting to log in to your computer after resuming your AD ID.'
				}
			/>
		),
		conditionalNavigation: () => {},
	},
];
export const ADID_FAQ = [
	{
		id: '01',
		title: 'MFA Questions',
		data: [
			{
				id: '01',
				question: 'What is MFA for Window Login?',
				answer:
					'Information Technology Division (ITD) is implementing a Multi-Factor Authentication (MFA) which is an additional layer of security for Windows logon. With the implementation of MFA, staff are required to input extra information in addition to the Active Directory (AD ID) and password at Windows logon.\n\nThe extra information is the eight (8) digit One-Time Password (OTP) generated using secure Soft Token or Hard Token.\n\nThis further protects the Bank from cyber-attacks by making it significantly harder for potential intruders to gain access to the Bank’s systems in the unlikely event that the staff’s AD ID and password is compromised.',
			},
			{
				id: '02',
				question: 'Can I have multiple Tokens to generate the 8-digit OTP?',
				answer: 'No. You can only have one Soft Token or one Hard Token at a time.',
			},
			{
				id: '03',
				question:
					'What action is required prior to implementation day (BOD will send an official Memo to all the branches/centres/HOE?',
				numbering: [
					'Ensure staff download the latest PBeXperience app on their mobile device.',
					'Submit a request via IUIA for the respective staff who requires a Hard Token.',
					'Refer to BOD Memo “Multi-Factor Authentication (MFA) for Windows Login” Appendix C for Step-and-Action on detailed procedures for MFA for Windows Logon.',
				],
			},
			{
				id: '04',
				question: 'How do I login to my Windows PC or notebook on/after implementation day?',
				answer:
					'With MFA, you are required to login with your Windows AD ID, AD password and followed by an eight (8) digit OTP generated via PBeXperience Soft Token or Hard Token.',
			},
			{
				id: '05',
				question: 'What should I do if my Windows AD password is expired?',
				answer: 'You may change your Windows AD password by:\n',
				boldText: 'If you are yet to login at the Windows Login Screen:\n',
				numbering: [
					'If there is an active session on the login screen, click “Switch User.”',
					'Key in your Windows AD ID, AD password and OTP',
					'You will be prompt to change your password',
					'Enter your expired password in the “Old password” field',
					'Enter your new password in the “New password” and Confirm password” fields',
					'Click “Submit” to change your password.\n',
				],
				boldText2: 'If you are currently logged in to Windows:\n',
				numbering2: [
					'Press Ctrl + Alt + Delete on your keyboard',
					'Select “Change a password”',
					'Ensure the Windows AD ID displayed is the one you want to change (edit if required)',
					'Enter your expired password in the “Old password” field',
					'Enter your new password in the “New password” and Confirm password” fields',
					'Click “Submit” to change your password.',
				],
			},
			{
				id: '06',
				question: 'What to do if my account is currently locked out?',
				answer:
					'Ensure that you are in the office and have the network cable plugged in to your PC/notebook, then perform the following:\n',
				boldText: 'If you are a Soft Token user (PBeXperience):\n',
				numbering: [
					'Launch the PBeXperience App',
					'Login with your Secure PIN or biometric',
					'Tap on “Profile”, then select “Self Service”',
					'Tap on “Unlock ID”, then answer the correct challenge questions',
					'Enter your Secure PIN or biometric',
					'Your account is now unlocked and may proceed to perform Windows logon\n',
				],
				boldText2: 'If you are a Hard Token user:\n',
				numbering2: [
					'Access to IUIA',
					'Navigate to System – “Active Directory”',
					'Then on Application – under  “Active Directory - Production”',
					'Click on the Action button',
					'Choose “Resume ID – revoked after number of attempts”, then click OK',
					'Submit the IUIA Request',
					'Approver (based on IUIA Approval Matrix) to approve the IUIA request',
					'Once approved, ITD will unlock/resume your Windows ID',
					'Your account is now unlocked and may proceed to perform Windows logon',
				],
			},
			{
				id: '07',
				question: 'Who shall I contact if I have query or issue pertaining to MFA?',
				answer:
					'For further clarification or assistance, please contact IT HelpDesk at 03-87388402.',
			},
		],
	},
	{
		id: '02',
		title: 'Soft Token Questions',
		data: [
			{
				id: '08',
				question:
					'What is the minimum mobile operating system (OS) versions supported by the PBeXperience mobile app?',
				answer: 'The minimum OS requirements for PBeXpereince are:',
				bullet: ['iPhone iOS users: Version 15 and above', 'Android users: Version 12 and above'],
				answer2:
					'Staff are reminded to ensure that the PBeXperience app version is updated from time to time.',
			},
			{
				id: '09',
				question:
					'What should I do if my mobile device is not compatible with the PBeXperience App?',
				answer: 'You are required to request for a Hard Token by submitting an IUIA request.\n',
				numbering: [
					'Access to IUIA',
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Hard Token”',
					'Click on the Action button',
					'Specify the reason as “Phone not compatible”, then click OK',
					'Submit the IUIA Request',
					'Approver (based on IUIA Approval Matrix) to approve the IUIA request',
					'After the approval by ITD, ITD will arrange to deliver your Hard Token to your Branch/Centre/HO within 7 days',
					'Upon receiving the Hard Token, login to IAM Portal to activate your Hard Token.',
				],
			},
			{
				id: '10',
				question: 'How do I generate an 8-digit OTP with my PBeXperience App (Soft Token)?',
				answer:
					'You must activate your Soft Token in PBeXperience App on your mobile device.\n\nLaunch the app, tap on “Token” and key in your Secure PIN or authenticate with your biometric to generate your 8-digit OTP.',
			},
			{
				id: '11',
				question: 'What should I do if I forgot my Secure PIN at my PBeXperience App?',
				answer:
					'You are required to deactivate and reactivate your Soft Token by following the steps below\n\n' +
					'Step 1: Submit an IUIA request to deactivate your Soft Token\n',
				numbering: [
					'Access to IUIA',
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Soft Token”',
					'On Type of Action – Select “Delete – other reason” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request\n',
				],
				answer2:
					'Step 2: Tap on “Login” in PBeXperience and then tap on “Forgot PIN”.\n\nStep 3: Now proceed with Soft Token activation by scanning the activation QR generated from IAM Portal at https://iam.pbb.my/portal',
			},
			{
				id: '12',
				question:
					'What should I do if I uninstalled and reinstalled my PBeXperience App or cleared my PBeXperience’s app cache?',
				answer:
					'You are required to deactivate and reactivate your Soft Token by following the following steps:\n\n' +
					'Step 1: Submit an IUIA request to deactivate your Soft Token\n',
				numbering: [
					'Access to IUIA',
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Soft Token”',
					'On Type of Action – Select “Delete – other reason” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request\n',
				],
				answer2:
					'Step 2: Now proceed with Soft Token activation at your PBeXperience App by scanning the activation QR generated from the IAM Portal at https://iam.pbb.my/portal',
			},
			{
				id: '13',
				question:
					'What should I do if my PBeXperience App close immediately after I launched the app?',
				answer:
					'Please ensure that the USB / wireless debugging function is toggled Off by following the steps below:\n',
				numbering: [
					'Go to your mobile device “Settings”',
					'Tap on “Development Options”',
					'Turn off “USB/Wireless Debugging”\n',
				],

				temp: 'If you are unable to find “Development Options”, please follow the steps below:\n',
				numbering2: [
					'Go to your mobile device “Settings”',
					'Tap on “About device” or “About phone”',
					'Tap on “Software Information”',
					'Tap “Build Number” seven (7) times',
					'Enter your pattern, PIN or password',
					'Turn off “USB/Wireless Debugging”\n',
				],
				answer2:
					'Note: You need to select “Additional Settings” for certain models.\n\nIn addition, there is a limitation on certain mobile models such Honor, Vivo and Oppo whereby the system detected the “USB/Wireless Debugging” as On even though it is Off. Please turn On the “USB/Wireless Debugging” and turn it off again.\n\nWhenever your mobile device is rebooted, you need to perform the above steps.',
			},

			{
				id: '14',
				question: 'What should I do if I have changed my mobile device?',
				answer:
					'You are required to deactivate and reactivate your Soft Token by following the steps below:\n\n' +
					'Step 1: Submit an IUIA request to deactivate your soft token\n',
				numbering: [
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Soft Token”',
					'On Type of Action – Select “Delete – other reason” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request\n',
				],
				answer2:
					'Step 2: Now proceed with Soft Token activation at PBeXperience by scanning the activation QR generated from IAM Portal at https://iam.pbb.my/portal',
			},
		],
	},
	{
		id: '03',
		title: 'Hard Token Questions',
		data: [
			{
				id: '15',
				question: 'How do I generate an 8-digit OTP with my Hard Token?',
				answer:
					'You need to press the grey button once on your Hard Token to generate an 8-digit OTP.',
			},
			{
				id: '16',
				question: 'What should I do if my Hard Token is faulty?',
				answer:
					'You must immediately report it to the IT Helpdesk at 03-87388402.\n\nThen you are required to submit an IUIA request for a replacement Hard Token as listed below:\n',
				numbering: [
					'Access to IUIA',
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Hard Token”',
					'On Type of Action – Select “Replacement of Token” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request',
					'Approver (based on IUIA Approval Matrix) to approve the IUIA request',
					'After the approval by ITD, ITD will arrange to deliver your Hard Token to your Branch/Centre/HO within 7 days',
					'Upon receiving the Hard Token, login to IAM Portal to activate your Hard Token.\n',
				],
				answer2:
					'You must surrender your faulty Hard Token to the PIC of the Branch/Centre/HOE to return your faulty Hard Token to ITD for warranty claim from the vendor.',
			},

			{
				id: '17',
				question: 'What should I do if I have lost my Hard Token?',
				answer:
					'You must immediately report the incident to the IT Helpdesk at    03-87388402.\n\n' +
					'Then you are required to submit an IUIA request for a replacement Hard Token as listed below:\n',
				numbering: [
					'Access to IUIA',
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Hard Token”',
					'On Type of Action – Select “Replacement of Token” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request',
					'Approver (based on IUIA Approval Matrix) to approve the IUIA request',
					'After the approval by ITD, ITD will arrange to deliver your Hard Token to your Branch/Centre/HO within 7 days',
					'Upon receiving the Hard Token, login to IAM Portal to activate your Hard Token',
				],
			},
			{
				id: '18',
				question: 'How do I change from a Hard Token to Soft Token?',
				answer:
					'Awesome! You are encouraged to use the Soft Token. Please follow the following steps:\n\n' +
					'Step 1: You are required to submit an IUIA request to deactivate your current hard token\n',
				numbering: [
					'Navigate to System – “Authenticator (Windows)”',
					'Then on Application – click “Auth_Hard Token”',
					'On Type of Action – Select “Delete – other reason” then click OK',
					'Specify the reason, then click OK',
					'Submit the IUIA Request\n',
				],
				answer2:
					'Step 2: Now proceed with your Soft Token activation at PBeXperience by scanning the activation QR generated from IAM Portal at https://iam.pbb.my/portal.\n\nYou must surrender your Hard Token to the PIC of the Branch/Centre/HOE to return your faulty Hard Token to ITD.',
			},
		],
	},
	{
		id: '04',
		title: 'IAM Challenge Questions',
		data: [
			{
				id: '19',
				question: 'How does this new security feature work?',
				answer:
					'The Challenge Questions and answers provide an extra layer of security to further authenticate your identity when you reset your AD ID password or unlock AD ID with us.',
			},
			{
				id: '20',
				question: 'How do I set up my Challenge Questions and answers?',
				answer:
					'It’s really simple! Login to IAM portal with your AD credential. Just select your preferred question and provide an answer from each group. There will be three questions in total.',
				showMore: SET_UP_CHALLENGE_QUESTIONS,
			},
			{
				id: '21',
				question: 'Can I choose not to set up Challenge Questions and answers?',
				answer:
					'You may not be able to reset AD ID password or unlock AD ID via PBeXperience if you skip the Challenge Questions enrolment.',
			},
			{
				id: '22',
				question: 'Can I set up my Challenge Questions via PBeXperience?',
				answer:
					'No. You may only set up your Challenge Questions and answers via IAM Portal. Access to AD ID reset / unlock feature will not be available until you have set up the Challenge Questions.',
			},
			{
				id: '23',
				question: 'Any tip in selecting the Challenge Questions and the corresponding answers?',
				answer:
					'Remember, this information will be used to verify your account. Please pick memorable questions and answers that only you will know.',
			},
			{
				id: '24',
				question: 'Can I use the same exact answer for all three Challenge Questions?',
				answer: 'No. You need to ensure that each answer is unique.',
			},
			{
				id: '25',
				question: 'Must I keep my chosen Challenge Questions and answers a secret?',
				answer:
					'Yes. Think of it like an additional password. Do not share this information with anyone.',
			},
			{
				id: '26',
				question: 'Forgot the answer to your challenge question?',
				answer:
					'You can re-enrol your Challenge Questions at the IAM portal at any time.\n\nFor more help, please contact ITD Helpdesk Support hotline at 03-8738 8402 for assistance.',
			},
		],
	},
	{
		id: '05',
		title: 'PB SecureSign',
		data: [
			{
				id: '27',
				question: 'What is Secure Sign?',
				answer:
					'SecureSign (SS) is a digital security token integrated into your PBeXperience (PBX) application. It enables greater application security and authentication. SS is also required to utilize certain function in PBX such as soft token, and self-service ID maintenance.',
			},
			{
				id: '28',
				question: 'What is the benefits of the PB SecureSign?',
				answer:
					'Aside from greater security, SS allows you to access key modules and features in PBX including:\n',
				numbering: [
					'Soft Token',
					'Self Service ID Maintenance - Resume ID and Password Reset',
					'Biometric/PIN Login',
				],
			},
			{
				id: '29',
				question: 'What is SecurePIN?',
				answer:
					'SecurePIN is a 6-digit personal identification number (PIN) created by you during SecureSign activation. SecurePIN will be used to authorise transactions hence it must always be kept secret and never be disclosed to anyone.',
			},
			{
				id: '30',
				question: 'How do I activate PB SecureSign?',
				answer:
					'After you have successfully setup your Challenge Questions in the IAM portal, and generate and scan the QR code thereafter under the SecureSign activation tab.',
				showMore: ACTIVATE_SECURE_SIGN,
			},

			{
				id: '31',
				question: 'Can I skip the PB SecureSign activation?',
				answer:
					'Yes. Only registered Hard Token users will not be prompted to activate SS, as only one token is allowed at one time. Staff who do not activate SS are also not allowed to use certain PBX features.',
			},
			{
				id: '32',
				question: 'How do I know if I have activated PB SecureSign successfully?',
				answer: 'The PB Secure Sign activation status will be displayed in PBeXperience App',
			},
			{
				id: '33',
				question:
					'What if I have forgotten my SecurePIN / My SecurePIN is locked? Can I change my SecurePIN?',
				numbering: [
					'Open your PBeXperience Application',
					'At the SecurePIN login, tap on the “Forgot PIN” icon at the top right corner',
					'When prompted “Forgot PIN”, select “OK” and proceed to login with your usual AD ID username and password to reset your SecurePIN.',
				],
				showMore: FORGOT_SECURE_PIN,
			},
		],
	},
	{
		id: '06',
		title: 'Self Service ID Maintenance',
		data: [
			{
				id: '34',
				question: 'I can’t find the module to reset my AD ID password',
				answer: 'Please make sure to check if the following has been done:',
				bullet: [
					'You have successfully activated SecureSign in PBeXperience',
					'Your PBeXperience app is up-to-date',
					'You are a staff of PBB, PIBB, or PIVB',
				],
				flowText: {
					text: 'If the above are in order, you should be able to find the module under ',
					flow: ['Profile', ' Self Service', 'Active Directory (AD)', 'Reset Password / Unlock ID'],
				},
				answer2:
					'If you have tried the above but still are unable to find the module, contact ITD Helpdesk at 03-8738 8402.',
				showMore: FIND_AD_RESET,
			},
			{
				id: '35',
				question: 'How do I reset my AD ID password?',
				answer: 'It’s easy! Just follow the steps below:',
				bullet: [
					'In PBeXperience, go to "Profile" ',
					'Tap on "Self Service"',
					'Tap on "Reset Password"',
					'Input your new password and confirm it',
					'Answer your 3 Challenge Questions when prompted',
					'Enter your SecureSign PIN or biometric verification.',
				],
				showMore: HOW_AD_RESET,
			},
			{
				id: '36',
				question: 'How do I unlock my AD ID?',
				answer: 'It’s easy! Just follow the steps below:',
				bullet: [
					'In PBeXperience, go to "Profile" ',
					'Tap on "Self Service"',
					'Tap on "Unlock ID"',
					'Input your new password and confirm it',
					'Answer your 3 Challenge Questions when prompted',
					'Enter your SecurePIN or biometric verification.',
				],
				showMore: UNLOCK_AD,
			},
			{
				id: '37',
				question: 'I have reset my password / resume my ID. However I still can’t login to my PC.',
				answer:
					'Users will need to wait approximately 15 minutes after completing a password reset / resume ID maintenance in PBeXperience.',
			},
		],
	},
	{
		id: '07',
		title: 'General PBeXperience Questions',
		data: [
			{
				id: '38',
				question:
					'What is the difference between AD ID login and SecureSign PIN login in PBeXperience?',
				answer:
					'Prior to the introduction of SecureSign, AD ID login was the standard PBeXperience login method. Now, users who activate SecureSign will no longer need to use their AD ID to login to PBeXperience anymore. This will allow them to login to PBeXperience despite having their AD ID being locked, so they can subsequently reset their AD ID password in PBeXperiece.',
			},
			{
				id: '39',
				question: 'I can’t seem to login to PBeXperience.',
				answer: 'Cosider checking / trying any of the following:',
				bullet: [
					'Make sure your PBeXperience version is up-to-date.',
					'Make sure your phone has a reasonably fast and stable internet connection (example 4G for mobile, or High Speed Broadband WiFi connection)',
					'If you are logging in using AD ID username and password, check to make sure that your AD ID is not already locked (ie. locked due to >3 password attempts, inactive, etc.)',
					'At the login screen, make sure you selected the correct domain when selecting the username (PBB/PIBB/PIVB)',
					'Delete your PBeXperience app, then download the latest version from the official Apple App Store / Google Playstore.',
				],
				answer2:
					'If the above steps still do not resolve your issue, contact ITD Helpdesk at 03-8738 8402.',
			},

			{
				id: '40',
				question: 'How do I check my PBeXperience version if it is up-to-date?',
				answer:
					'The current PBeXperience version on your device is displayed at the bottom of the app login screen.\n\n' +
					'The best approach is to go to the official Apple App Store / Google Playstore and search for PBeXperience and check if there are any updates that are available for download/installation. The latest version will always be displayed there.',
			},
		],
	},
];
