import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, useWindowDimensions, View } from 'react-native';

import { Loading, Screen, Text } from 'atoms';
import { Header } from 'molecules';
import AdidImage from 'assets/adid/adid-2.png';
import NextIcon from 'assets/icon/next.png';
import { Typography } from 'styles';

import { CHALLENGE_QUESTIONS, instructionText, SECURE_SIGN } from '../utils';
import { Button } from '../components/Button';
import { styles } from './styles';

export const ADIDInstructionScreen = ({ handleFAQPress, handleGoBack, handlePopUp, isLoading }) => {
	const { width } = useWindowDimensions();

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={{
					text: 'Multi Factor Authentification',
					style: Typography.H6,
				}}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.background}>
					<Image source={AdidImage} style={[styles.image, { width: width * 0.8 }]} />
					<Text variant={'H6'} style={styles.title}>
						PBeXperience Soft Token
					</Text>
					{instructionText.map((item, index) => (
						<Text key={index} style={styles.instructionText}>
							{item}
						</Text>
					))}

					<Button
						onPress={() => handlePopUp(CHALLENGE_QUESTIONS)}
						title="Step 1: IAM Portal Challenge Questions"
						style={styles.buttonView}
						titleStyle={styles.buttonTitle}
						iconStyle={styles.buttonIcon}
					/>
					<Button
						onPress={() => handlePopUp(SECURE_SIGN)}
						title="Step 2: Activate PB SecureSign"
						style={styles.buttonView}
						titleStyle={styles.buttonTitle}
						iconStyle={styles.buttonIcon}
					/>
					<Button
						onPress={handleFAQPress}
						title="Frequently Asked Questions (FAQ)"
						rightIcon={NextIcon}
						style={styles.buttonViewFAQ}
						titleStyle={styles.buttonTitleFAQ}
						iconStyle={styles.buttonIcon}
					/>
				</View>
			</ScrollView>
			{isLoading && <Loading />}
		</Screen>
	);
};
