import React from 'react';
import {
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	useWindowDimensions,
	View,
	Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const MissionScreen = ({ navigation }) => {
	const { width, height } = useWindowDimensions();
	const buttons = [
		{
			id: 1,
			image: require('../../assets/mainScreen/btn-1.png'),
			locked: false,
			onPress: () => {
				playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

				Linking.openURL('https://pbdash2025.wixsite.com/pb-dash/mission-1');
			},
		},
		{
			id: 2,
			image: require('../../assets/mainScreen/btn-2.png'),
			locked: false,
			onPress: () => {
				playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

				Linking.openURL('https://pbdash2025.wixsite.com/pb-dash/mission-2');
			},
		},
		{
			id: 3,
			image: require('../../assets/mainScreen/btn-3.png'),
			locked: false,
			onPress: () => {
				playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

				Linking.openURL('https://pbdash2025.wixsite.com/pb-dash/mission-3');
			},
		},
		{
			id: 4,
			image: require('../../assets/mainScreen/btn-4.png'),
			locked: false,
			onPress: () => {
				playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

				Linking.openURL('https://pbdash2025.wixsite.com/pb-dash/mission-4');
			},
		},
	];

	return (
		<ImageBackground
			source={require('../../assets/mainScreen/bg-mainscreen2.png')}
			style={styles.container}
			resizeMode="stretch"
		>
			<SafeAreaView style={styles.safe}>
				<ImageBackground
					source={require('../../assets/mainScreen/bg-mission.png')}
					style={[styles.scrollBackground, { width: width * 0.9, height: height * 0.5 }]}
					resizeMode="stretch"
				>
					<Image
						source={require('../../assets/mainScreen/mission-title.png')}
						style={[styles.titleImage, { width: width * 0.8, height: height * 0.2 }]}
						resizeMode="contain"
					/>
					<View style={styles.buttonGrid}>
						{buttons.map((btn) => (
							<TouchableOpacity
								key={btn.id}
								onPress={btn.locked ? null : btn.onPress}
								style={styles.gridButton}
								disabled={btn.locked}
							>
								<Image
									source={btn.locked ? require('../../assets/mainScreen/lock-btn.png') : btn.image}
									style={styles.gridImage}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						))}
					</View>
				</ImageBackground>

				<TouchableOpacity
					onPress={() => {
						playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

						navigation.goBack();
					}}
					style={styles.nextButtonWrapper}
				>
					<Image
						source={require('../../assets/mainScreen/btn-back.png')}
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
		top: -50,
		marginTop: 10,
	},
	scrollBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},

	nextButtonWrapper: {
		marginTop: 10,
	},
	nextButton: {
		width: 200,
		height: 60,
	},
	textPurple: {
		color: '#8A2BE2',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textBlue: {
		color: '#1E90FF',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textGreen: {
		color: '#2E8B57',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textRed: {
		color: '#B22222',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textGold: {
		color: '#B8860B',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textBrown: {
		color: '#5C4033',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	buttonGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 50,
	},

	gridButton: {
		width: '50%',
		alignItems: 'center',
	},

	gridImage: {
		width: '100%',
		height: 130,
		marginVertical: 10,
	},
});
