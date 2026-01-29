import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Space, Text } from 'atoms';
import Banner from 'assets/festive/eCardChallenge/card-unlock-banner.png';
import SuccessGif from 'assets/festive/eCardChallenge/success.gif';
import { styles } from './styles';
import { BaseModal } from 'molecules';
import { commonStyles } from 'styles';

export const ChallengeCompletePopUp = ({ isVisible, onClose, onConfirm }) => {
	return (
		<BaseModal visible={isVisible} onBackdropPress={onClose} onRequestClose={onClose}>
			<View style={[commonStyles.center]}>
				<View style={styles.content}>
					<Image source={Banner} style={styles.banner} />
					<Image source={SuccessGif} style={styles.unlockGif} />
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
					<Space height={20} />
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={onConfirm} style={styles.unlockButton}>
							<Text variant={'P4'} style={styles.buttonText}>
								Challenge Completed!
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</BaseModal>
	);
};
