import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import Title from 'assets/festive/eCardChallenge/task-1-title.png';
import { colors } from 'configs';
import SuccessGif from 'assets/lottie/green_tick.json';

import { Text } from 'atoms';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export const Task1 = ({ video, isComplete }) => {
	return (
		<View style={styles.taskContainer}>
			<Image source={Title} style={styles.titleImg} />
			<View style={styles.divider} />

			{isComplete ? (
				<SuccessView />
			) : (
				<Video source={video} repeat={true} resizeMode={'cover'} style={styles.video} />
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
		width: width * 0.7,
		height: 20,
		marginVertical: 5,
	},
	taskContainer: {
		backgroundColor: '#FFE792',
		borderWidth: 2,
		borderColor: colors.primary,
		alignItems: 'center',
		paddingHorizontal: 5,
		marginTop: 20,
		borderRadius: 8,
		marginHorizontal: 10,
	},
	divider: {
		borderBottomColor: '#EBCA54',
		borderBottomWidth: 2,
		width: '95%',
	},
	video: {
		flex: 1,
		width: width * 0.5,
		height: undefined,
		aspectRatio: 0.5,
		marginVertical: 10,
	},
	unlockGif: {
		width: 160,
		height: 160,
		alignSelf: 'center',
	},
	instructionView: {
		padding: 10,
		marginTop: 10,
		marginHorizontal: 20,
	},
	title: {
		textAlign: 'center',
		marginTop: 10,
	},
});
