import React from 'react';
import { Animated, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style.js';
import { AnimatedDice } from '../../components/animatedDice';
import ClickHere from '../../assets/click-roll.png';
import PlayerStart from '../../assets/player-start.png';
import Mission from '../../assets/mission.png';
import { boxCordinates } from './conf.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingPopUp } from 'screens/snakeAndLadder/components/settingPopUp/index.js';
import { routes } from 'navigations';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound/index.js';
import { commonStyles } from 'styles';
import { Loading } from 'atoms';
import { LOADING } from 'constant';

export const SnakeAndLadderScreen = ({
	diceCount,
	animatedPosition,
	diceRoll,
	rollTrigger,
	setIsRolling,
	startAnimatedMovement,
	navigation,
	playerImage,
	isRolling,
	handleClosePopUp,
	handleRollPress,
	showDice,
	isSettingPopup,
	selectedAssets,
	setShowDice,
	setIsSettingPopup,
	status,
}) => {
	return (
		<ImageBackground source={selectedAssets.background} style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<View>
					<View style={styles.row}>
						<View style={styles.leftColumn}>
							<TouchableOpacity
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									navigation.goBack();
								}}
								disabled={isRolling}
							>
								<Image source={selectedAssets.back} style={styles.iconButton} />
							</TouchableOpacity>
						</View>
						<View style={styles.centerColumn}>
							<TouchableOpacity
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									navigation.navigate(routes.MISSION);
								}}
								disabled={isRolling}
							>
								<Image source={Mission} style={styles.missionButton} />
							</TouchableOpacity>
						</View>
						<View style={styles.rightColumn}>
							<TouchableOpacity
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									setIsSettingPopup(true);
								}}
								disabled={isRolling}
							>
								<Image source={selectedAssets.setting} style={styles.iconButton} />
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={[commonStyles.fill, commonStyles.center]}>
					{/* Second Row */}
					<View style={styles.secondRow}>
						<View style={styles.bossDoorColumn}>
							<Image source={selectedAssets.bossDoor} style={styles.bossDoor} />
						</View>
						<View style={styles.diceCountColumn}>
							<Image source={selectedAssets.diceBg} style={styles.diceCount} />
							<Text style={styles.infoText}>{diceCount}</Text>
						</View>
					</View>

					<ImageBackground source={selectedAssets.board} style={styles.board} resizeMode="stretch">
						<View style={styles.overlay}>
							<View style={styles.grid}>
								{boxCordinates
									.slice()
									.reverse()
									.map((row, rowIndex) => (
										<View key={rowIndex} style={styles.row}>
											{row.map((box, colIndex) => (
												<View key={colIndex} style={styles.box} />
											))}
										</View>
									))}
							</View>

							<Animated.Image
								source={playerImage}
								style={[
									styles.playerImage,
									{
										bottom: Animated.add(animatedPosition.y, new Animated.Value(-25)),
										left: Animated.add(animatedPosition.x, new Animated.Value(-31)),
									},
								]}
							/>
						</View>
					</ImageBackground>
				</View>

				<View style={[styles.bottomRow]}>
					<View style={styles.playerCol}>
						<Image source={PlayerStart} style={styles.playerStart} />
					</View>

					<View style={styles.gameInfo}>
						<TouchableOpacity onPress={handleRollPress} disabled={isRolling}>
							<Image source={ClickHere} style={[styles.button, isRolling && { opacity: 0.5 }]} />
						</TouchableOpacity>
					</View>
				</View>
				{showDice && (
					<View style={styles.diceContainer}>
						<AnimatedDice
							finalDiceRoll={diceRoll}
							rollTrigger={rollTrigger}
							onDiceRollEnd={() => {
								setShowDice(false);
								startAnimatedMovement(diceRoll);

								setTimeout(() => {
									setIsRolling(false);
								}, 3000);
							}}
						/>
					</View>
				)}

				<SettingPopUp
					isSettingVisible={isSettingPopup}
					handleClosePopUp={handleClosePopUp}
					navigation={navigation}
				/>
			</SafeAreaView>

			{status === LOADING && <Loading preset={'blurFullScreen'} />}
		</ImageBackground>
	);
};
