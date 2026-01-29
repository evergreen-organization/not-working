import { useNavigation } from '@react-navigation/native';
import { routes } from 'navigations';
import React from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PBDASH_SOUND, playSoundEffect, usePBDashSound } from 'screens/snakeAndLadder/sound';

export const FinalLeaderBoard = () => {
	const navigation = useNavigation();
	usePBDashSound({ sound: PBDASH_SOUND.END_SOUND });

	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/mainScreen/bg-final-leaderboard.png')}
				style={styles.background}
				resizeMode="cover"
			/>

			<View style={styles.content}>
				<View style={styles.centeredButtonWrapper}>
					<TouchableOpacity
						onPress={() => {
							playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

							Linking.openURL('https://pbdash2025.wixsite.com/pb-dash/campaignupdates');
						}}
					>
						<Image
							source={require('../../assets/mainScreen/btn-final-leaderboard.png')}
							style={styles.buttonImage}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => {
						playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);
						navigation.navigate(routes.HOME);
					}}
				>
					<Image
						source={require('../../assets/mainScreen/btn-exit-ending.png')}
						style={styles.buttonImage}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 60,
	},
	centeredButtonWrapper: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 120,
	},
	buttonImage: {
		width: 200,
		height: 60,
		resizeMode: 'contain',
	},
});
