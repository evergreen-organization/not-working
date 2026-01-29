import { combineReducers } from 'redux';
import userReducer, { userLoggedOut, userReset } from './user/reducer';
import meetings from './meeting/reducer';
import waterTrackerReducer from './waterTracker/reducer';
import leadgenReducer from './leadgen360';
import regulations from 'stores/regulation/reducer';
import appStateReducer from './appStateReducer';
import avatarReducer from './avatar';
import newsReducer, { newsReset } from './news/reducer';
import clinicReducer from './clinic/reducer';
import dashboardReducer from './dashboard/reducer';
import trainingReducer from './training/reducer';
import promoReducer from './promotion/reducer';
import interstateReducer from './interstate';
import leaveReducer from './leave';
import libraryReducer from './library';
import loginReducer, { loginReset } from './login/reducer';
import covidReducer from './covid/reducer';
import photoWallReducer from './photoWallChristmas';
import notificationNewReducer, { notificationReset } from './notificationNew/reducer';
import invitationsReducer from './invitations/reducer';
import pinReducer, { init as initPin } from './pin/reducer';
import softTokenReducer, { softTokenReset } from './softToken/reducer';
import authReducer from './auth/reducer';
import reliefReducer from './relief/reducer';
import casReducer from './cas/reducer';
import eBizReducer from './eBizCard/reducer';
import dataCollectionReducer, { dataCollectionReset } from './dataCollection/reducer';
import analyticsReducer from './analytics/reducer';
import eCardsAdventReducer from './eCardAdvent/reducer';
import widgetReducer from './widget/reducer';

import biometricReducer, { biometricFromLogout, biometricReset } from './biometric/reducer';
import adAuthenticationReducer, { challengeQuestionsReset } from './adAuthentication';
import adAwarenessReducer, { adAwarenessReset } from './adAwareness';
import mfaReducer, { mfaReset } from './mfa/reducer';
import tncReducer, { tncReset } from './tnc/reducer';
import messaging from '@react-native-firebase/messaging';
import { fetchLogout, fetchUnbindDevice } from './login';
import utilityReducer from './utility/reducer';
import jumbleRumpleReducer from './jumbleRumple/reducer';
import piratePerilReducer from './piratePeril/reducer';
import snakeAndLadderReducer, { resetPlayerPosition } from './snakeAndLadder/reducer';

const appReducer = combineReducers({
	user: userReducer,
	biometric: biometricReducer,
	notificationNew: notificationNewReducer,
	regulations: regulations,
	appState: appStateReducer,
	waterTracker: waterTrackerReducer,
	avatar: avatarReducer,
	meetings: meetings,
	clinic: clinicReducer,
	news: newsReducer,
	dashboard: dashboardReducer,
	training: trainingReducer,
	promotion: promoReducer,
	interstate: interstateReducer,
	leave: leaveReducer,
	library: libraryReducer,
	login: loginReducer,
	covid: covidReducer,
	adAuthentication: adAuthenticationReducer,
	pin: pinReducer,
	softToken: softTokenReducer,
	auth: authReducer,
	photoWallChristmas: photoWallReducer,
	adAwareness: adAwarenessReducer,
	leadgen: leadgenReducer,
	relief: reliefReducer,
	invitations: invitationsReducer,
	cas: casReducer,
	dataCollection: dataCollectionReducer,
	analytics: analyticsReducer,
	eCardsAdventNew: eCardsAdventReducer,
	eBizCard: eBizReducer,
	mfa: mfaReducer,
	tnc: tncReducer,
	widget: widgetReducer,
	utility: utilityReducer,
	jumbleRumple: jumbleRumpleReducer,
	piratePeril: piratePerilReducer,
	snakeAndLadder: snakeAndLadderReducer,
});

export default appReducer;

export const logout = () => (dispatch) => {
	dispatch(fetchLogout());
	dispatch(biometricFromLogout(true));
	dispatch(userLoggedOut());
	dispatch(newsReset());
	dispatch(challengeQuestionsReset());
};

export const unbind = () => (dispatch) => {
	dispatch(fetchUnbindDevice());
	dispatch(initPin());
	dispatch(biometricReset());
	dispatch(userReset());
	dispatch(loginReset());
	dispatch(softTokenReset());
	dispatch(adAwarenessReset());
	dispatch(dataCollectionReset());
	dispatch(mfaReset());
	dispatch(biometricFromLogout(true));
	dispatch(userLoggedOut());
	dispatch(newsReset());
	dispatch(challengeQuestionsReset());
	dispatch(tncReset());
	dispatch(notificationReset());
	dispatch(resetPlayerPosition());
	messaging().deleteToken().then();
};
