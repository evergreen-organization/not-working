//@ts-nocheck
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoggedIn, logout } from 'stores';
import { showInfo } from 'utils';
import routes from '../routes';
import TabNavigator from './TabNavigator';

import { ChallengeQuestions } from 'screens/challengeQuestions';
import {
	ApproveDetail,
	CovidAdministratorNavigator,
	HistoryDetail,
	SelfTestHistory,
	UploadResult,
} from 'screens/covid';
import { ApplyLeave, ApproveLeave } from 'screens/home/leave';
import { InitLoading } from 'screens/init';
import { TravelDeclarationForm } from 'screens/interstateTravel';
import Journey from 'screens/journey/Journey';
import { EnrollPin } from 'screens/login';
import { NewNotification, NotificationNewPreview } from 'screens/notification';
import { PanelClinics } from 'screens/panel';
import { PhotoWallGalleryView } from 'screens/photoWall';
import { PhotoWallWithTemplate } from 'screens/photoWall/carousel/';
import { ECardChallenge } from 'screens/photoWall/challenges';
import { RegulationDetails, RegulationLandingPage } from 'screens/regulation';
import { ReliefAssignment } from 'screens/reliefAssignment';
import { PBStartHere } from 'screens/training';
import { Profile } from 'screens/user/profile';
import { InputPassword } from 'screens/user/selfService/inputPassword';
import { WaterTracker, WaterTrackerForm } from 'screens/waterTracker';

import { ADIDFaq } from 'screens/adidAwareness/faq';
import { ADIDFaqResult } from 'screens/adidAwareness/faqResult';
import { ADIDInstruction } from 'screens/adidAwareness/instruction';
import { SoftTokenActivation, SoftTokenIdValidation, SoftTokenPAC } from 'screens/softToken';
import ValidatePin from 'screens/user/settings/ValidatePin';
import { useIAMModal } from '../../contexts';

import { AppNavigatorParamsList } from 'navigations/types';
import { UserActivity } from 'organisms';
import { ImageView, QuickLinks } from 'screens';
import { ADIDAwarenessPopUp } from 'screens/adidAwareness/popUp';
import { useScreenRecord } from 'hooks';
import {
	ChangeProfilePic,
	ChangeRequests,
	DynamicRequestList,
	EBizCardFields,
	EBizCardInfo,
	EBizCardSettings,
	EBizCardTutorialDetails,
	EBizCardTutorials,
	EBizHome,
	EditCardForm,
	Rewards,
	WebViewComp,
} from 'screens/eBizCard';
import { FeedbackWebView } from 'screens/eBizCard/eBizCardTutorials/FeedbackWebView';
import {
	MfaADIDPasswordForm,
	MFAEnrollBiometric,
	MFAEnrollPin,
	MfaHasHardToken,
	MFAIntro,
	MFAOtp,
	MFAPin,
	MfaQR,
	MFASuccess,
	MfaTnc,
} from 'screens/mfa';
import { CardTextForm } from 'screens/photoWall/carousel/cardTextForm';
import {
	BingoGameInstructionScreen,
	BingoReadingQuestionScreen,
	BombDiffuser,
	BossGameScreen,
	FlappyBird,
	JumbleRumbleScreen,
	LadderDash,
	LeaderBoard,
	PiratePerilScreen,
	SnakeAndLadder,
	TrueTrappedScreen,
	TutorialScreen,
	WhackAMoleScreen,
} from 'screens/snakeAndLadder';
import { SelfService } from 'screens/user/selfService';
import { ChangePin } from 'screens/user/settings/changePin';
import { AnalyticsScreen } from '../../screens/analytics';
import {
	LG360Acknowledgement,
	LG360DetailsForm,
	LG360NewLead,
	LG360Prospect,
} from '../../screens/leadgen360';
import { PreviewVideo } from '../../screens/previewVideo';

import { DidYouKnowScreen } from 'screens/snakeAndLadder/components/didKnowScreen';
import { EndingScreen } from 'screens/snakeAndLadder/mainScreen/endScreen';
import { AvatarScreen } from 'screens/snakeAndLadder/mainScreen/avatarScreen';
import { MissionInstruction } from 'screens/snakeAndLadder/mainScreen/missionInstruction';
import { MissionScreen } from 'screens/snakeAndLadder/mainScreen/missionScreen';
import { StoryScreen } from 'screens/snakeAndLadder/mainScreen/storyScreen';
import { useGlobalSound } from 'screens/snakeAndLadder/sound/useGlobalSound';
import { BingoReadingLose } from 'screens/snakeAndLadder/miniGame/magicReading/readingLose/component';
import { BingoReadingWin } from 'screens/snakeAndLadder/miniGame/magicReading/readingWin/component';
import { SpaceShooterWrapper } from 'screens/snakeAndLadder/extraGame/spaceShooter';
import { FinalLeaderBoard } from 'screens/snakeAndLadder/mainScreen/finalLeaderboard';

const Stack = createStackNavigator<AppNavigatorParamsList>();

const AppNavigator = () => {
	const dispatch = useDispatch();
	const { setIsIAMModalVisible } = useIAMModal();
	const isUserLoggedIn = useSelector(getUserLoggedIn);
	const logInRef = useRef(isUserLoggedIn);
	useScreenRecord();
	useGlobalSound();

	useEffect(() => {
		logInRef.current = !!isUserLoggedIn;
	}, [isUserLoggedIn]);

	const onAction = (val: boolean) => {
		if (!val && logInRef.current) {
			dispatch(logout());
			setIsIAMModalVisible(false);
			showInfo('Logged out', '5 minutes inactivity');
		}
	};

	return (
		<UserActivity onAction={onAction}>
			<ADIDAwarenessPopUp />
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<Stack.Screen name={routes.TAB_NAVIGATOR} component={TabNavigator} />

				<Stack.Screen name={routes.INIT_LOADING} component={InitLoading} />

				{/* water tracker */}
				<Stack.Screen name={routes.WATER_TRACKER_FORM} component={WaterTrackerForm} />
				<Stack.Screen name={routes.WATER_TRACKER} component={WaterTracker} />
				<Stack.Screen name={routes.PANEL_CLINICS} component={PanelClinics} />

				<Stack.Screen name={routes.NEW_NOTIFICATION} component={NewNotification} />
				<Stack.Screen name={routes.NEW_NOTIFICATION_PREVIEW} component={NotificationNewPreview} />

				<Stack.Screen name={routes.APPLY_LEAVE} component={ApplyLeave} />
				<Stack.Screen name={routes.APPROVE_LEAVE} component={ApproveLeave} />
				<Stack.Screen name={routes.PROFILE} component={Profile} />

				<Stack.Screen name={routes.REGULATION_LANDING_PAGE} component={RegulationLandingPage} />
				<Stack.Screen name={routes.REGULATION_DETAILS} component={RegulationDetails} />
				<Stack.Screen name={routes.PB_JOURNEY} component={Journey} />

				<Stack.Screen name={routes.INTERSTATE_FORM} component={TravelDeclarationForm} />

				<Stack.Screen name={routes.RELIEF_ASSIGNMENT} component={ReliefAssignment} />

				<Stack.Screen name={routes.PB_START_HERE} component={PBStartHere} />

				<Stack.Screen name={routes.COVID_UPLOAD_RESULT} component={UploadResult} />
				<Stack.Screen name={routes.COVID_TEST_HISTORY} component={SelfTestHistory} />
				<Stack.Screen name={routes.COVID_APPROVE_RESULT} component={CovidAdministratorNavigator} />
				<Stack.Screen name={routes.COVID_APPROVE_DETAIL} component={ApproveDetail} />
				<Stack.Screen name={routes.COVID_HISTORY_DETAIL} component={HistoryDetail} />

				{/*Photo Wall*/}
				<Stack.Screen name={routes.PHOTO_WALL} component={PhotoWallWithTemplate} />
				<Stack.Screen name={routes.PHOTO_WALL_GALLERY_VIEW} component={PhotoWallGalleryView} />
				<Stack.Screen name={routes.ECARD_CHALLENGE} component={ECardChallenge} />
				<Stack.Screen name={routes.CARD_TEXT_FORM} component={CardTextForm} />

				<Stack.Screen name={routes.ENROLL_PIN} component={EnrollPin} />

				<Stack.Screen
					name={routes.SOFT_TOKEN_ACTIVATION}
					component={SoftTokenActivation}
					options={{ gestureEnabled: false }}
				/>
				<Stack.Screen name={routes.SOFT_TOKEN_CHECKIC} component={SoftTokenIdValidation} />
				<Stack.Screen name={routes.SOFT_TOKEN_VALIDATEPAC} component={SoftTokenPAC} />
				<Stack.Screen name={routes.VALIDATE_PIN} component={ValidatePin} />

				{/* Selfservice Ad Authentication */}
				<Stack.Screen name={routes.SELF_SERVICE} component={SelfService} />
				<Stack.Screen name={routes.INPUT_PASSWORD} component={InputPassword} />
				<Stack.Screen name={routes.CHALLENGE_QUESTIONS} component={ChallengeQuestions} />
				<Stack.Screen name={routes.ADID_INSTRUCTION} component={ADIDInstruction} />
				<Stack.Screen name={routes.ADID_FAQ} component={ADIDFaq} />
				<Stack.Screen name={routes.ADID_FAQ_RESULT} component={ADIDFaqResult} />
				{/* LG360 */}
				<Stack.Screen name={routes.LG360_PROSPECT} component={LG360Prospect} />
				<Stack.Screen name={routes.LG360_NEW_LEAD} component={LG360NewLead} />
				<Stack.Screen name={routes.LG360_NEW_LEAD_DETAILS_FORM} component={LG360DetailsForm} />
				<Stack.Screen name={routes.LG360_ACKNOWLEDGEMENT} component={LG360Acknowledgement} />
				{/* Analytics */}
				<Stack.Screen name={routes.ANALYTICS} component={AnalyticsScreen} />

				{/* Preview Video */}
				<Stack.Screen name={routes.PREVIEW_VIDEO} component={PreviewVideo} />

				{/* EBiz Card */}
				<Stack.Screen name={routes.EBIZ_HOME} component={EBizHome} />
				<Stack.Screen name={routes.EBIZ_CARD_INFO} component={EBizCardInfo} />
				<Stack.Screen name={routes.EDIT_EBIZ_CARD} component={EditCardForm} />

				<Stack.Screen name={routes.WEBVIEW_PRIVIEW} component={WebViewComp} />
				<Stack.Screen name={routes.CUSTOMIZE_EBIZ_FIELD} component={EBizCardFields} />

				<Stack.Screen name={routes.CHANGE_PROFILE_EBIZ_PROFILE} component={ChangeProfilePic} />

				<Stack.Screen name={routes.EBIZ_GUID} component={EBizCardTutorials} />
				<Stack.Screen name={routes.EBIZ_CHANGE_REQUESTS} component={ChangeRequests} />
				<Stack.Screen name={routes.EBIZ_DYNAMIC_REQUESTS} component={DynamicRequestList} />
				<Stack.Screen name={routes.EBIZ_SYSTEM_SETTINGS} component={EBizCardSettings} />

				<Stack.Screen name={routes.EBIZ_TUTORIAL} component={EBizCardTutorials} />
				<Stack.Screen name={routes.EBIZ_TUTORIAL_DETAILS} component={EBizCardTutorialDetails} />
				<Stack.Screen name={routes.EBIZ_TUTORIAL_WEBVIEW} component={FeedbackWebView} />
				<Stack.Screen name={routes.EBIZ_REWARDS} component={Rewards} />

				{/* MFA */}
				<Stack.Screen name={routes.MFA_TNC} component={MfaTnc} />
				<Stack.Screen name={routes.MFA_INTRO} component={MFAIntro} />
				<Stack.Screen name={routes.MFA_PIN} component={MFAPin} />
				<Stack.Screen name={routes.MFA_OTP} component={MFAOtp} />
				<Stack.Screen name={routes.MFA_QR_SCAN} component={MfaQR} />
				<Stack.Screen name={routes.MFA_ENROLL_PIN} component={MFAEnrollPin} />
				<Stack.Screen name={routes.MFA_SUCCESS} component={MFASuccess} />
				<Stack.Screen name={routes.MFA_HAS_HARD_TOKEN} component={MfaHasHardToken} />

				<Stack.Screen name={routes.MFA_ADID_PASSWORD_FORM} component={MfaADIDPasswordForm} />
				<Stack.Screen name={routes.MFA_ENROLL_BIOMETRIC} component={MFAEnrollBiometric} />

				<Stack.Screen name={routes.CHANGE_PIN} component={ChangePin} />
				<Stack.Screen name={routes.IMAGE_VIEW} component={ImageView} />
				<Stack.Screen name={routes.QUICK_LINKS} component={QuickLinks} />

				{/*Snake And Ladder*/}
				<Stack.Screen name={routes.LADDER_DASH} component={LadderDash} />
				<Stack.Screen name={routes.SNAKE_AND_LADDER} component={SnakeAndLadder} />
				<Stack.Screen name={routes.LADDER_TUTORIAL} component={TutorialScreen} />
				<Stack.Screen name={routes.LEADERBOARD} component={LeaderBoard} />
				<Stack.Screen name={routes.AVATAR} component={AvatarScreen} />
				<Stack.Screen name={routes.STORY_LINE} component={StoryScreen} />
				<Stack.Screen name={routes.MISSION} component={MissionScreen} />
				<Stack.Screen name={routes.MISSION_INSTRUCTION} component={MissionInstruction} />

				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.JUMBLE_RUMPLE}
					component={JumbleRumbleScreen}
				/>

				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BINGO_READING_QUESTION}
					component={BingoReadingQuestionScreen}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BINGO_READING_WIN}
					component={BingoReadingWin}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BINGO_READING_LOSE}
					component={BingoReadingLose}
				/>

				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BOMB_DIFFUSER}
					component={BombDiffuser}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.PIRATE_PERIL}
					component={PiratePerilScreen}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.TRUE_TRAPPED}
					component={TrueTrappedScreen}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BOSS_GAME}
					component={BossGameScreen}
				/>

				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.FLAPPY_BIRD}
					component={FlappyBird}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.WHACK_AMOLE}
					component={WhackAMoleScreen}
				/>
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.SPACE_SHOOTER}
					component={SpaceShooterWrapper}
				/>

				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.BINGO_GAME_INSTRUCTION}
					component={BingoGameInstructionScreen}
				/>

				<Stack.Screen name={routes.DY_KNOW} component={DidYouKnowScreen} />
				<Stack.Screen
					options={{
						gestureEnabled: false,
					}}
					name={routes.ENDING_SCREEN}
					component={EndingScreen}
				/>
				<Stack.Screen name={routes.FINAL_LEADERBOARD} component={FinalLeaderBoard} />
			</Stack.Navigator>
		</UserActivity>
	);
};

export default AppNavigator;
