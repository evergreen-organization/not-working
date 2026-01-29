import { routes } from 'navigations';
import React, { useState } from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';
import { getGame } from 'stores';
import BackButton from '../../assets/mainScreen/btn-back.png';
import NextButton from '../../assets/mainScreen/btn-next.png';

export const TutorialScreen = ({ navigation }) => {
	const { width, height } = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const { selectedAvatar } = useSelector(getGame);

	const tutorialTexts = [
		'Welcome to PB Dash! Our version of Snake and Ladder. Get Ready to journey through exciting boards, each packed with unique challenges.',
		'You get 3 dice rolls every day - just tap "Roll the Dice" to move ahead!',
		'Ladder launch with minigames:\n[green]Win to climb up[/green]\n[red]Fail and stay put[/red]\nWorms work the other way:\n[green]Win to stay safe[/green]\n[red]Fail and slide down![/red]',
		"Have some extra dice rolls? Use them to retry any minigame you didn't beat",
		"Reach the end of the board? You're not done just yet! To unlock the next board, you'll need to defeat the powerful Boss Tile at the end of each board.",
		'Conquer all boards, defeat every boss, and claim your victory as the PB Dash Champion. Good luck!',
	];

	const parseTextWithStyles = (text) => {
		const regex = /\[(green|red)\](.*?)\[\/\1\]/g;
		const result = [];

		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				result.push({ text: text.slice(lastIndex, match.index), style: 'normal' });
			}
			result.push({ text: match[2], style: match[1] }); // match[1] is 'green' or 'red'
			lastIndex = regex.lastIndex;
		}

		if (lastIndex < text.length) {
			result.push({ text: text.slice(lastIndex), style: 'normal' });
		}

		return result;
	};

	const nextText = () => {
		if (index < tutorialTexts.length - 1) {
			setIndex(index + 1);
		}
	};

	const prevText = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};

	return (
		<ImageBackground
			source={require('../../assets/mainScreen/bg-mainscreen2.png')}
			style={styles.container}
			resizeMode="stretch"
		>
			<SafeAreaView style={styles.safe}>
				<ImageBackground
					source={require('../../assets/mainScreen/bg-tutorial2.png')}
					style={[styles.scrollBackground, { width: width * 0.95, height: height * 0.5 }]}
					resizeMode="stretch"
				>
					<Image
						source={require('../../assets/mainScreen/tutorial-title.png')}
						style={[styles.titleImage, { width: width * 1.6, height: height * 0.15 }]}
						resizeMode="contain"
					/>

					{/* Text Area */}
					<View style={styles.textArea}>
						<Text style={styles.textPurple}>
							{parseTextWithStyles(tutorialTexts[index]).map((part, i) => (
								<Text
									key={i}
									style={[
										part.style === 'green' && styles.green,
										part.style === 'red' && styles.red,
									]}
								>
									{part.text}
								</Text>
							))}
						</Text>
					</View>

					<View style={styles.arrowContainer}>
						{index > 0 ? (
							<TouchableOpacity onPress={prevText}>
								<Image
									source={require('../../assets/mainScreen/arrow-back.png')}
									style={styles.arrow}
								/>
							</TouchableOpacity>
						) : (
							<View style={styles.arrowPlaceholder} />
						)}

						{index < tutorialTexts.length - 1 ? (
							<TouchableOpacity onPress={nextText}>
								<Image
									source={require('../../assets/mainScreen/arrow-next.png')}
									style={styles.arrow}
								/>
							</TouchableOpacity>
						) : (
							<View style={styles.arrowPlaceholder} />
						)}
					</View>
				</ImageBackground>

				<TouchableOpacity
					onPress={() => {
						playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

						if (selectedAvatar) {
							navigation.goBack();
						} else {
							navigation.replace(routes.AVATAR);
						}
					}}
					style={styles.nextButtonWrapper}
				>
					<Image
						source={selectedAvatar ? BackButton : NextButton}
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
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
	},
	titleImage: {
		position: 'absolute',
		top: -180,
		marginTop: 10,
	},
	scrollBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	textArea: {
		minHeight: 150,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	textPurple: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},
	arrowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		marginTop: 30,
	},
	arrow: {
		width: 70,
		height: 35,
	},
	nextButtonWrapper: {
		marginTop: 10,
	},
	nextButton: {
		width: 200,
		height: 60,
	},
	arrowPlaceholder: {
		width: 80,
		height: 40,
	},
	green: {
		color: '#4CAF50',
		fontWeight: 'bold',
	},
	red: {
		color: '#F44336',
		fontWeight: 'bold',
	},
});
