import React, { Component } from 'react';
import {
	StyleSheet,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

const screenX = Dimensions.get('screen').width;
const screenY = Dimensions.get('screen').height;

export default class TitleScreen extends Component {
	render() {
		return (
			<ImageBackground
				source={require('../assets/bg-tutorial.png')}
				style={{ width: screenX, height: screenY }}
			>
				<TouchableOpacity
					style={{ flex: 1 }} // make TouchableOpacity fill the entire ImageBackground
					onPress={() => {
						this.props.playMenuNavigation();
						this.props.startGame();
					}}
				>
					{/* You can add other content here if needed */}
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

{
	/* <View style={styles.isJustGameContainer}>
					<Text style={styles.isJustGameText}>Is Just Game</Text>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Space Shooter</Text>
				</View>
				<View style={styles.playerStats}>
					<Text style={styles.playerStatText}>High Score: {this.props.highScore}</Text>
					<Text style={styles.playerStatText}>
						Enemies Destroyed: {this.props.allEnemiesDestroyed}
					</Text>
					<Text style={styles.playerStatText}>Coins Collected: {this.props.allCoinsCollected}</Text>
				</View>
				<View style={styles.titleScreenContainer}>
					<ImageBackground
						source={require('../assets/player_large.png')}
						style={styles.titleImage}
					/>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => {
							this.props.playMenuNavigation();
							this.props.startGame();
						}}
					>
						<Text style={styles.buttonText}>Start Game</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => {
							this.props.playMenuNavigation();
							this.props.openControls();
						}}
					>
						<Text style={styles.buttonText}>Controls</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => {
							this.props.playMenuNavigation();
							this.props.openInfo();
						}}
					>
						<Text>About</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.adMobBanner}>
					{/* <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID="ca-app-pub-5830175342552944/8024421682"
                        testDeviceID="EMULATOR"
                    /> */
}
// </View> */}

const styles = StyleSheet.create({
	isJustGameContainer: {
		position: 'absolute',
		width: screenX * 0.8,
		left: '10%',
		top: 0,
	},
	isJustGameText: {
		color: 'white',
		fontStyle: 'italic',
		textAlign: 'center',
	},
	titleContainer: {
		position: 'absolute',
		width: 0.8 * this.screenX,
		top: 35,
		left: '10%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		position: 'absolute',
		fontSize: 36,
	},
	playerStats: {
		backgroundColor: 'lightgrey',
		position: 'absolute',
		opacity: 0.7,
		borderRadius: 8,
		left: '10%',
		top: '10%',
		width: screenX * 0.8,
		height: screenY * 0.15,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playerStatText: {
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},
	titleScreenContainer: {
		padding: 20,
		borderRadius: 8,
		backgroundColor: 'lightgrey',
		opacity: 0.7,
		position: 'absolute',
		width: screenX * 0.8,
		height: screenY * 0.55,
		top: '30%',
		left: '10%',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	titleImage: {
		width: screenX * 0.4,
		height: screenX * 0.4,
	},
	titleTextContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		display: 'flex',
		width: screenX * 0.5,
		height: 40,
		borderRadius: 4,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	adMobBanner: {
		position: 'absolute',
		justifyContent: 'center',
		bottom: 0,
		width: screenX,
		height: 60,
	},
});
