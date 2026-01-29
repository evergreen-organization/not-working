import React, { useRef } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import routes from '../routes';
import { Login } from 'screens/login';
import {
	MFAAdidForm,
	MFAPin,
	MfaQR,
	MFAEnrollPin,
	MFASuccess,
	MFAEnrollBiometric,
	MFAOtp,
	MFAUserConflict,
	MfaTnc,
	MfaReEnrollBiometric,
} from 'screens/mfa';
import { useScreenRecord } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { showInfo } from 'utils';
import { QuickLinks } from 'screens';
import { UserActivity } from 'organisms';

const Stack = createStackNavigator();

const AuthNavigator = () => {
	useScreenRecord();
	const navigation = useNavigation();
	const timerRef = useRef(null);

	const onAction = (isActive) => {
		// Handle user inactivity here
		if (!isActive && navigation.getCurrentRoute().name !== routes.LOGIN) {
			clearInterval(timerRef.current);
			navigation.navigate(routes.LOGIN);
			showInfo('Session Timeout!', '5 minutes inactivity');
		}
	};

	return (
		<UserActivity onAction={onAction}>
			<Stack.Navigator
				initialRouteName={routes.LOGIN}
				screenOptions={() => ({
					headerMode: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					presentation: 'card',
				})}
			>
				<Stack.Screen name={routes.MFA_INFO_CONFLICT} component={MFAUserConflict} />
				<Stack.Screen name={routes.LOGIN} component={Login} />
				<Stack.Screen name={routes.MFA_PIN} component={MFAPin} />
				<Stack.Screen name={routes.MFA_OTP} component={MFAOtp} />
				<Stack.Screen name={routes.MFA_ADID_FORM} component={MFAAdidForm} />
				<Stack.Screen name={routes.MFA_QR_SCAN} component={MfaQR} />
				<Stack.Screen name={routes.MFA_ENROLL_PIN} component={MFAEnrollPin} />
				<Stack.Screen name={routes.MFA_SUCCESS} component={MFASuccess} />
				<Stack.Screen name={routes.MFA_RE_ENROLL_BIOMETRIC} component={MfaReEnrollBiometric} />
				<Stack.Screen name={routes.MFA_ENROLL_BIOMETRIC} component={MFAEnrollBiometric} />
				<Stack.Screen name={routes.MFA_TNC} component={MfaTnc} />

				{/* Common screens */}
				<Stack.Screen name={routes.QUICK_LINKS} component={QuickLinks} />
			</Stack.Navigator>
		</UserActivity>
	);
};

export default AuthNavigator;
