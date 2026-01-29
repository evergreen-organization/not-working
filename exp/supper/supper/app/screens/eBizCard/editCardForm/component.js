import React from 'react';
import { Screen } from 'atoms';
import { Image, useWindowDimensions, View } from 'react-native';
import { Header } from 'molecules';
import dummyEdit from './../../../assets/eBizCard/dummyEdit.png';

import { Typography } from 'styles';
import comingSoon from 'assets/eBizCard/comingNotification.png';
import { ComingSoonPopUp } from '../components';

const imageRatio = 3332 / 1368;
const screenPadding = 24;

export const EditCardFormComp = ({
	setIsPopUpVisible,
	isPopUpVisible,
	handleClosePopUp,
	handleGoBack,
}) => {
	const { width } = useWindowDimensions();
	const imageWidth = width - screenPadding * 2;

	return (
		<>
			<Screen>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleGoBack,
					}}
					centerComponent={{
						text: 'Edit eBC Information',
						style: Typography.H6,
					}}
				/>
				<View style={{ flex: 1, padding: screenPadding }}>
					<Image
						resizeMode="contain"
						source={dummyEdit}
						style={{ width: imageWidth, height: imageWidth * imageRatio }}
					/>
				</View>
			</Screen>
			<ComingSoonPopUp
				isPopUpVisible={isPopUpVisible}
				setIsPopUpVisible={setIsPopUpVisible}
				onPressClosePopUp={handleClosePopUp}
				image={comingSoon}
				text={'Feature Coming Soon!'}
			/>
		</>
	);
};
