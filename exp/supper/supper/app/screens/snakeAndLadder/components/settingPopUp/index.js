import React, { useState } from 'react';
import { Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import SettingBackground from '../../assets/settings/bg-setting.png';

// Image imports
import Notification from '../../assets/settings/mission-btn.png';
import Leaderboard from '../../assets/settings/leaderboard-btn.png';
import MusicOn from '../../assets/settings/music-btn.png';
import MusicOff from '../../assets/settings/music-off-btn.png';
import Tutorial from '../../assets/settings/tuto-btn.png';
import ExitBtn from '../../assets/settings/exit-btn-pp.png';
import CloseBtn from '../../assets/settings/close-btn.png';
import Info from '../../assets/settings/info-btn.png';
import Redirect from '../../assets/settings/alert-popup.png';
import YesPopup from '../../assets/settings/btn-yes-popup.png';
import NoPopup from '../../assets/settings/btn-no-popup.png';

import { routes } from 'navigations';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, setMusicOn } from 'stores';
import { Linking } from 'react-native';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const SettingPopUp = ({ isSettingVisible, handleClosePopUp, navigation }) => {
	const dispatch = useDispatch();
	const { isMusicOn } = useSelector(getGame);
	const [showConfirmPopup, setShowConfirmPopup] = useState(false);

	const toggleMusic = () => {
		dispatch(setMusicOn(!isMusicOn));
	};

	const handleNavigate = (route) => {
		handleClosePopUp();
		setTimeout(() => {
			navigation.navigate(route); // Navigate after small delay to allow modal close animation
		}, 300);
	};

	return (
		<Modal animationType="fade" transparent visible={isSettingVisible}>
			<View style={styles.modalContainer}>
				<ImageBackground source={SettingBackground} style={styles.imgBackground}>
					{/* Close Button */}
					<TouchableOpacity style={styles.closeBtn} onPress={handleClosePopUp}>
						<Image source={CloseBtn} style={styles.closeImg} />
					</TouchableOpacity>

					{/* 4 Buttons */}
					<View style={styles.gridContainer}>
						<View style={styles.row}>
							<TouchableOpacity
								style={styles.imgButtonView}
								onPress={() => handleNavigate(routes.MISSION)}
							>
								<Image source={Notification} style={styles.imgButton} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.imgButtonView}
								onPress={() => setShowConfirmPopup(true)}
							>
								<Image source={Info} style={styles.imgButton} />
							</TouchableOpacity>
						</View>

						<View style={styles.centerRow}>
							<TouchableOpacity
								style={styles.imgButtonView}
								onPress={() => handleNavigate(routes.LEADERBOARD)}
							>
								<Image source={Leaderboard} style={styles.imgButton} />
							</TouchableOpacity>
						</View>

						<View style={styles.row}>
							<TouchableOpacity style={styles.imgButtonView} onPress={toggleMusic}>
								<Image source={isMusicOn ? MusicOn : MusicOff} style={styles.imgButton} />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.imgButtonView}
								onPress={() => handleNavigate(routes.LADDER_TUTORIAL)}
							>
								<Image source={Tutorial} style={styles.imgButton} />
							</TouchableOpacity>
						</View>
					</View>

					{/* Exit Button */}
					<TouchableOpacity style={styles.exitBtn} onPress={() => handleNavigate(routes.HOME)}>
						<Image source={ExitBtn} style={styles.exitImg} />
					</TouchableOpacity>
				</ImageBackground>
			</View>

			{showConfirmPopup && (
				<View style={styles.confirmOverlay}>
					<ImageBackground source={Redirect} style={styles.confirmPopup} resizeMode="contain">
						<View style={styles.confirmButtons}>
							<TouchableOpacity
								style={styles.confirmBtn}
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									setShowConfirmPopup(false);
									Linking.openURL('https://pbdash2025.wixsite.com/pb-dash');
								}}
							>
								<Image source={YesPopup} style={styles.confirmBtnImg} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.confirmBtn}
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									setShowConfirmPopup(false);
								}}
							>
								<Image source={NoPopup} style={styles.confirmBtnImg} />
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000077',
	},
	imgBackground: {
		width: 320,
		height: 500,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		resizeMode: 'contain',
	},

	closeBtn: {
		position: 'absolute',
		top: 0,
		right: 10,
		width: 40,
		height: 40,
		zIndex: 10,
	},
	closeImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	gridContainer: {
		marginTop: 140,
		marginBottom: 30,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 200,
		marginBottom: 20,
		marginRight: 40,
	},
	imgButtonView: {
		width: 80,
		height: 80,
		marginHorizontal: 20,
		marginVertical: 5,
	},
	imgButton: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	exitBtn: {
		marginBottom: 30,
	},
	exitImg: {
		width: 200,
		height: 60,
		resizeMode: 'contain',
	},
	centerRow: {
		alignItems: 'center',
		marginBottom: 20,
	},

	confirmOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},

	confirmPopup: {
		width: 320,
		height: 500,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},

	confirmButtons: {
		flexDirection: 'row',
		marginTop: 200,
	},

	confirmBtn: {
		marginHorizontal: 10,
		width: 100,
		height: 50,
	},

	confirmBtnImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
});
