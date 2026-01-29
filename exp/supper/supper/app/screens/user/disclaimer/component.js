import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { Screen, Space, Text } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import { DisclaimerStrings } from 'configs';
import InfoIcon from 'assets/icon/information.png';

import { styles } from './styles';
export const DisclaimerComp = ({ handleHeaderLeftBtn }) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Disclaimer',
					style: Typography.H6,
				}}
			/>
			<ScrollView>
				<View style={styles.content}>
					<View style={styles.sectionContainer}>
						<Image source={InfoIcon} style={styles.icon} />
						<Text variant={'P6'} style={styles.paragraph}>
							{DisclaimerStrings.main}
						</Text>
					</View>
					<View style={styles.sectionContainer}>
						<Text variant={'H4'} style={styles.heading}>
							Notice
						</Text>
						<Text variant={'P6'} style={styles.paragraph}>
							{DisclaimerStrings.notice}
						</Text>
					</View>
					<View style={styles.sectionContainer}>
						<Text variant={'H4'} style={styles.heading}>
							Credits
						</Text>
						<Text variant={'P6'} style={styles.paragraph}>
							{DisclaimerStrings.credits}
						</Text>
					</View>
				</View>
				<Space height={40} />
			</ScrollView>
		</Screen>
	);
};
