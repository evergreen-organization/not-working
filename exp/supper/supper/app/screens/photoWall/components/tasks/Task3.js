import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Title from 'assets/festive/eCardChallenge/task-3-title.png';
import { Text } from 'atoms';
import { E_LEARNING_STEPS } from '../../utils/challenge';
import { colors } from 'configs';
import LottieView from 'lottie-react-native';
import SuccessGif from '../../../../assets/lottie/green_tick.json';

export const Task3 = ({ isComplete }) => {
	return (
		<View style={styles.taskContainer}>
			{isComplete ? (
				<SuccessView />
			) : (
				<>
					<Image source={Title} style={styles.titleImg} />
					<View style={styles.divider} />
					<Text variant={'P4'} style={styles.description}>
						Did you know that you can learn and complete eLearning courses via LMS online using your
						mobile phone? Learning has never been easier and more convenient! Here’s how you can do
						it:
					</Text>
					{E_LEARNING_STEPS.map((item) => (
						<View key={item.title} style={styles.stepContainer}>
							<Image source={item.image} style={styles.stepImage} />
							<View style={styles.stepDetailContainer}>
								<View style={styles.stepIcon}>
									<Text variant={'P4'} style={styles.stepTitle}>
										{item.title}
									</Text>
								</View>
								<Text variant={'P10'} style={styles.descriptionText}>
									{item.description}
								</Text>
							</View>
						</View>
					))}
					<Text variant={'P4'} style={styles.description}>
						So what are you waiting for? Go and complete some eLearning courses via LMS online
						today!
					</Text>
				</>
			)}
		</View>
	);
};

const SuccessView = () => (
	<>
		<LottieView style={styles.unlockGif} source={SuccessGif} autoPlay loop />
		<Text variant={'P7'} style={styles.title}>
			Congratulations!
		</Text>
		<View style={styles.instructionView}>
			<Text variant={'P3'} style={styles.title}>
				{
					"You have successfully unlocked a Merdeka eFestive Card! \n\nLet's make this Merdeka festival even more special by sharing this awesome card with your loved ones!"
				}
			</Text>
		</View>
	</>
);

const styles = StyleSheet.create({
	titleImg: {
		width: undefined,
		height: 25,
		aspectRatio: 8,
		marginVertical: 5,
	},
	divider: {
		borderBottomColor: '#EBCA54',
		borderBottomWidth: 2,
		width: '95%',
		marginBottom: 10,
	},
	description: {
		marginVertical: 5,
	},
	stepContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	stepImage: {
		width: 150,
		height: 180,
	},
	stepIcon: {
		backgroundColor: '#2626C6',
		borderRadius: 20,
		paddingHorizontal: 5,
		paddingVertical: 5,
		width: '40%',
	},
	stepTitle: {
		color: colors.white,
		textAlign: 'center',
	},
	stepDetailContainer: {
		marginHorizontal: 10,
	},
	descriptionText: {
		width: 150,
		marginTop: 5,
	},
	taskContainer: {
		backgroundColor: '#FFE792',
		borderWidth: 2,
		borderColor: colors.primary,
		alignItems: 'center',
		paddingHorizontal: 12,
		marginTop: 20,
		borderRadius: 8,
		marginHorizontal: 10,
		paddingVertical: 12,
	},
	unlockGif: {
		width: 160,
		height: 160,
		alignSelf: 'center',
	},
	title: {
		textAlign: 'center',
		marginTop: 10,
	},
});
