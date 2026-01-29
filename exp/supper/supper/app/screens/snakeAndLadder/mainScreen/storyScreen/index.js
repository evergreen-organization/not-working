import { routes } from 'navigations';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const StoryScreen = ({ navigation, route }) => {
	const { currentBoard } = route.params;

	let storyImage, centerImage;

	switch (currentBoard) {
		case 0:
			storyImage = require('../../assets/board2/bg-story2.png');
			centerImage = require('../../assets/board2/storyline2.png');
			break;
		case 1:
			storyImage = require('../../assets/board3/bg-story3.png');
			centerImage = require('../../assets/board3/storyline3.png');
			break;
		case 2:
			storyImage = require('../../assets/board4/bg-story4.png');
			centerImage = require('../../assets/board4/storyline4.png');
			break;
		default:
			storyImage = require('../../assets/board1/bg-story1.png');
			centerImage = require('../../assets/board1/storyline1.png');
			break;
	}
	return (
		<ImageBackground source={storyImage} style={styles.container} resizeMode="stretch">
			<SafeAreaView style={styles.safe}>
				<View style={styles.centerWrapper}>
					<Image source={centerImage} style={styles.centerImage} resizeMode="contain" />
				</View>
				<TouchableOpacity
					onPress={() => {
						playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

						if (![0, 1, 2].includes(currentBoard)) {
							navigation.replace(routes.SNAKE_AND_LADDER);
						} else {
							navigation.navigate(routes.SNAKE_AND_LADDER);
						}
					}}
					style={styles.nextButtonWrapper}
				>
					<Image
						source={require('../../assets/mainScreen/btn-next.png')}
						style={styles.nextButton}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safe: {
		flex: 1,
		paddingVertical: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerWrapper: {
		width: '140%',
		aspectRatio: 1,
	},
	centerImage: {
		width: '100%',
		height: '100%',
	},
	nextButtonWrapper: {
		marginTop: 100,
	},
	nextButton: {
		width: 200,
		height: 60,
	},
});
