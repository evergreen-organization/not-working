import { Screen } from 'atoms';
import { Header } from 'molecules';
import { routes } from 'navigations';
import React, { useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Typography } from 'styles';
import dummyPicture from './../../../assets/eBizCard/dummyreward.png';
import { ComingSoonPopUp } from '../components';
import comingSoon from './../../../assets/eBizCard/comingNotification.png';
const imageRatio = 3200 / 1368;
const screenPadding = 24;

export const Rewards = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const imageWidth = width - screenPadding * 2;
	const [isPopUpVisible, setIsPopUpVisible] = useState(true);
	const handleGoBack = () => {
		navigation.navigate(routes.EBIZ_SYSTEM_SETTINGS);
	};
	const handleClosePopUp = () => {
		setIsPopUpVisible(false);
		handleGoBack();
	};

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
					text: 'Rewards & Challenges',
					style: Typography.H6,
				}}
			/>
			<View style={{ ...styles.contentContainer, padding: screenPadding }}>
				<Image
					resizeMode="contain"
					source={dummyPicture}
					style={{ width: imageWidth, height: imageWidth * imageRatio }}
				/>
			</View>
			<ComingSoonPopUp
				isPopUpVisible={isPopUpVisible}
				setIsPopUpVisible={setIsPopUpVisible}
				onPressClosePopUp={handleClosePopUp}
				image={comingSoon}
				text={'Feature Coming Soon!'}
			/>
		</Screen>
	);
};
const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
});
