import React from 'react';
import { Image, View } from 'react-native';
import { Screen, Text } from 'atoms';
import ChallengeBg from 'assets/festive/eCardChallenge/challenge-bg.png';
import { Header } from 'molecules';
import { styles } from './styles';
import ChallengeBorder from 'assets/festive/eCardChallenge/challenge-border.png';
import { ScrollView } from 'react-native-gesture-handler';
import { ChallengeBottomButtons } from '../components';
import { ECARD_CHALLENGES, ECARD_CHALLENGES_BUTTON_TYPE, TASK } from '../utils/challenge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ECardChallengeComp = ({
	handleGoBack,
	handleComplete,
	handleCancel,
	handleCompleteSurvey,
	id,
	isComplete,
}) => {
	const insets = useSafeAreaInsets();
	const { title, description, props, completeTitle, buttonType } = ECARD_CHALLENGES[id] || {};

	const renderTask = () => {
		const Component = TASK[id];
		if (!Component) {
			return null;
		}
		return <Component onCompleteSurvey={handleCompleteSurvey} isComplete={isComplete} {...props} />;
	};

	const renderButton = () => {
		if (isComplete || buttonType === ECARD_CHALLENGES_BUTTON_TYPE.survey) {
			return null;
		}
		return (
			<ChallengeBottomButtons
				completeTitle={completeTitle}
				onCancel={handleCancel}
				onComplete={handleComplete}
			/>
		);
	};

	return (
		<Screen modal style={{ paddingTop: insets.top }}>
			<Image style={styles.challengeBg} source={ChallengeBg} />
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={<HeaderCenterComponent />}
			/>
			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					style={styles.challengeContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.dayTitleContainer}>
						<Image style={styles.dayImage} source={ChallengeBorder} resizeMode="stretch" />
						<View style={styles.textContainer}>
							<Text style={styles.dayText}>{title}</Text>
						</View>
					</View>
					<View style={styles.middleContainer}>
						<Text style={{ textAlign: 'justify', paddingHorizontal: 15 }}>{description}</Text>
						{renderTask()}
					</View>
				</ScrollView>
			</View>
			{renderButton()}
		</Screen>
	);
};

const HeaderCenterComponent = () => (
	<View style={styles.container}>
		<Text style={styles.title}>Unlock eFestive Card</Text>
	</View>
);
