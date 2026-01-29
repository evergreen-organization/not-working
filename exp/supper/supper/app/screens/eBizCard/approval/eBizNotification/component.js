import React from 'react';
import { Screen } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import { Image, useWindowDimensions, View } from 'react-native';

import { ComingSoonPopUp } from 'screens/eBizCard/components';

import dummyChange from './../../../../assets/eBizCard/dummyChange.png';
import comingSoon from 'assets/eBizCard/comingNotification.png';
const imageRatio = 3120 / 1368;
const screenPadding = 24;

export const ChangeRequestsComp = ({
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
						text: 'Change Request Approvals',
						style: Typography.H6,
					}}
				/>

				<View
					style={{
						flex: 1,
						padding: 24,
					}}
				>
					<Image
						resizeMode="contain"
						source={dummyChange}
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
