import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Space, Text } from 'atoms';
import Banner from 'assets/festive/eCardChallenge/new-card-banner.png';
import UnlockGif from 'assets/festive/eCardChallenge/unlock.gif';

import { styles } from './styles';
import { BaseModal } from 'molecules';
import { commonStyles } from 'styles';

export const ChallengePopUp = ({ isVisible, intro, onClose, onConfirm }) => {
	return (
		<BaseModal
			transparent={true}
			visible={isVisible}
			onBackdropPress={onClose}
			onRequestClose={onClose}
		>
			<View style={[commonStyles.center]}>
				<View style={styles.content}>
					<Image source={Banner} style={styles.banner} />
					<Image source={UnlockGif} style={styles.unlockGif} />
					<View style={styles.instructionView}>
						<Text variant={'P4'} style={styles.instructionText}>
							{intro}
						</Text>
					</View>
					<Space height={20} />
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={onClose} style={styles.cancelButton}>
							<Text variant={'P4'} style={styles.buttonText}>
								Back
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onConfirm} style={styles.unlockButton}>
							<Text variant={'P4'} style={styles.buttonText}>
								Unlock Now!
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</BaseModal>
	);
};
