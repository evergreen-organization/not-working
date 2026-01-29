import React, { PureComponent } from 'react';
import { StyleSheet, View, StatusBar, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Player from './components/Player.js';
import { GameEngine } from 'react-native-game-engine';
import GameLogic from './GameLogic.js';
import TitleScreen from './views/TitleScreen.js';
import Info from './views/Info.js';
import Controls from './views/Controls.js';
import Config from './config/Config.js';
import EntitySizes from './config/EntitySizes.js';
import Sound from 'react-native-sound';
import { BingoReadingWin } from 'screens/snakeAndLadder/miniGame/magicReading/readingWin/component.js';
import { BingoReadingLose } from 'screens/snakeAndLadder/miniGame/magicReading/readingLose/component.js';
import { routes } from 'navigations';

Sound.setCategory('Playback');

class SpaceShooter extends PureComponent {
	constructor(props) {
		super(props);
		this.screenX = Dimensions.get('screen').width;
		this.screenY = Dimensions.get('screen').height;
		this.playerWidth = 50;
		this.menuNavigation = new Sound(require('./assets/sound_bits/menu_navigation.mp3'));

		this.bgMusic = new Sound(require('./assets/sound_bits/space_shooter.mp3'), (error) => {
			if (error) {
				console.log('Failed to load bg music', error);
				return;
			}
			this.bgMusic.setNumberOfLoops(-1); // Loop indefinitely
		});
		this.GameLogic = new GameLogic(this.setState.bind(this));

		this.state = {
			// Current Game Stats
			points: Config.gameDefaults.points,
			coinsCollected: 0,
			shotsFired: 0,
			enemiesDestroyed: 0,
			playerHealth: Config.gameDefaults.playerHealth,

			// Player Stats
			highScore: 0,
			allEnemiesDestroyed: 0,
			allCoinsCollected: 0,

			shotsLeft: Config.gameDefaults.shotsLeft,
			hasGameStarted: false,
			hasGameEnded: false,
			isInfoOpen: false,
			isControlsOpen: false,
			causeOfEnd: '',
		};
	}

	componentDidUpdate(prevProps, prevState) {
		// Start music when game starts
		if (!prevState.hasGameStarted && this.state.hasGameStarted) {
			this.bgMusic.play((success) => {
				if (!success) {
					console.log('bgMusic play failed');
				}
			});
		}

		// Stop music when game ends or user leaves game screen
		if (prevState.hasGameStarted && !this.state.hasGameStarted) {
			this.bgMusic.stop();
		}

		const wasRetry = prevProps.route?.params?.isRetry;
		const isRetryNow = this.props.route?.params?.isRetry;
		if (!wasRetry && isRetryNow) {
			this.hardResetFromRetry();
		}
	}

	hardResetFromRetry = () => {
		// stop music immediately
		if (this.bgMusic) {
			this.bgMusic.stop();
		}

		// fully reset game logic + state
		this.GameLogic.resetGame();
		this.setState({
			points: 0,
			coinsCollected: 0,
			shotsFired: 0,
			enemiesDestroyed: 0,
			playerHealth: Config.gameDefaults.playerHealth,
			shotsLeft: Config.gameDefaults.shotsLeft,
			hasGameStarted: false,
			hasGameEnded: false,
			isInfoOpen: false,
			isControlsOpen: false,
			causeOfEnd: '',
		});

		// clear the retry param so it doesn't retrigger
		this.props.navigation.setParams({ isRetry: false });
	};

	componentWillUnmount() {
		if (this.bgMusic) {
			this.bgMusic.stop(() => this.bgMusic.release());
		}
	}

	resetAndNavigate = async (didWin) => {
		if (this.props.route?.params?.onDone) {
			this.props.route.params.onDone(didWin);
		}

		// Stop music before navigating away
		if (this.bgMusic) {
			this.bgMusic.stop();
		}

		this.GameLogic.resetGame();

		// Delay re-render to prevent React from drawing the old game state again
		this.setState(
			{
				hasGameStarted: false,
				hasGameEnded: false,
				isInfoOpen: false,
				isControlsOpen: false,
				points: 0,
				coinsCollected: 0,
				shotsLeft: Config.gameDefaults.shotsLeft,
				playerHealth: Config.gameDefaults.playerHealth,
			},
			() => {
				// Add a delay before navigating
				setTimeout(() => {
					this.props.navigation.navigate(routes.SNAKE_AND_LADDER);
				}, 50); // delay just enough to let React re-render
			},
		);
	};

	readPlayerStats = async () => {
		try {
			const keys = ['highScore', 'allEnemiesDestroyed', 'allCoinsCollected'];
			const result = await AsyncStorage.multiGet(keys);

			const highScore = result[0]?.[1] ?? '0';
			const allEnemiesDestroyed = result[1]?.[1] ?? '0';
			const allCoinsCollected = result[2]?.[1] ?? '0';

			this.setState({
				highScore,
				allEnemiesDestroyed,
				allCoinsCollected,
			});
		} catch (error) {
			console.error('Failed to read player stats:', error);
		}
	};

	backToTitleScreen = () => {
		this.GameLogic.resetGame();
		this.setState({
			hasGameStarted: false,
			hasGameEnded: false,
			isInfoOpen: false,
			isControlsOpen: false,
			points: 0,
			coinsCollected: 0,
			shotsLeft: Config.gameDefaults.shotsLeft,
			playerHealth: Config.gameDefaults.playerHealth,
		});
	};

	render() {
		if (this.state.hasGameStarted) {
			return (
				<ImageBackground
					source={require('./assets/space_background.png')}
					style={{ width: this.screenX, height: this.screenY }}
				>
					<GameEngine
						style={styles.gameContainer}
						systems={[
							this.GameLogic.gameLoop,
							this.GameLogic.movePlayer,
							this.GameLogic.autoFireProjectile,
							this.GameLogic.chanceToSpawnEnemy,
							// this.GameLogic.chanceToSpawnFallingCollectible,
							this.GameLogic.chanceToSpawnFallingHeart,
							this.GameLogic.chanceToSpawnAsteroid,
							this.GameLogic.playAgain,
						]}
						entities={{
							1: {
								name: 'Player',
								size: EntitySizes.PLAYER_SIZE,
								circle: EntitySizes.PLAYER_CIRCLE,
								health: this.state.playerHealth,
								position: [this.screenX / 2 - this.playerWidth / 2, this.screenY - 100],
								renderer: <Player />,
							},
							// @Dev to set static object, make sure entity doesn't have name an is in the visible field
							// 2: {
							//     position: [this.screenX / 3 - this.playerWidth / 2, this.screenY - 100],
							//     renderer: <Projectile/>
							// }
						}}
					>
						<StatusBar hidden={true} />
						{this.state.hasGameEnded && (
							<>
								{this.state.points >= 150 ? (
									<BingoReadingWin
										score={this.state.points}
										type={this.props.type}
										navigation={this.props.navigation}
										route={this.props.route}
										currentBoard={this.props.currentBoard}
										tile={this.props.tile}
										endGameParams={{
											isWin: true,
											campaignId: this.props.campaignId,
											gameType: this.props.route.params.gameType || 'GAME',
											questionSession: this.props.questionSession || '',
											answers: [{ questionId: this.props.questionId, answer: 0 }],
										}}
										onCancel={() => this.resetAndNavigate(true)}
									/>
								) : (
									<BingoReadingLose
										score={this.state.points}
										type={this.props.route.params.type}
										navigation={this.props.navigation}
										route={this.props.route}
										position={this.props.position}
										currentBoard={this.props.currentBoard}
										tile={this.props.tile}
										endGameParams={{
											isWin: false,
											campaignId: this.props.campaignId,
											gameType: this.props.route.params.gameType || 'GAME',
											questionSession: this.props.questionSession || '',
											answers: [{ questionId: this.props.questionId, answer: 1 }],
										}}
										onCancel={() => {
											this.resetAndNavigate(false);
										}}
									/>
								)}
							</>
						)}
					</GameEngine>
				</ImageBackground>
			);
		} else if (!this.state.hasGameStarted && !this.state.isInfoOpen && !this.state.isControlsOpen) {
			return (
				<View>
					<StatusBar hidden={true} />
					<TitleScreen
						playMenuNavigation={() => {
							this.menuNavigation.stop(() => this.menuNavigation.play());
						}}
						startGame={() => this.setState({ hasGameStarted: true })}
						openControls={() => this.setState({ isControlsOpen: true })}
						openInfo={() => this.setState({ isInfoOpen: true })}
						allCoinsCollected={this.state.allCoinsCollected}
						allEnemiesDestroyed={this.state.allEnemiesDestroyed}
						highScore={this.state.highScore}
					/>
				</View>
			);
		} else if (!this.state.hasGameStarted && this.state.isInfoOpen) {
			return (
				<View>
					<StatusBar hidden={true} />
					<Info
						closeInfo={() => this.setState({ isInfoOpen: false })}
						playMenuNavigation={() => {
							this.menuNavigation.stop(() => this.menuNavigation.play());
						}}
					/>
				</View>
			);
		} else if (!this.state.hasGameStarted && this.state.isControlsOpen) {
			return (
				<View>
					<StatusBar hidden={true} />
					<Controls
						closeControls={() => this.setState({ isControlsOpen: false })}
						playMenuNavigation={() => {
							this.menuNavigation.stop(() => this.menuNavigation.play());
						}}
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	gameContainer: {
		zIndex: 0,
		position: 'relative',
		backgroundColor: 'transparent',
	},
});

const instance = new SpaceShooter();

export { SpaceShooter, instance as default };
