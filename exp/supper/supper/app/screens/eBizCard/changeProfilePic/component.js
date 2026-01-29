import React from 'react';
import { Image, View } from 'react-native';

import { Screen } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';

import dummyProfile from './../../../assets/eBizCard/dummyProfile.png';
import comingSoon from './../../../assets/eBizCard/comingNotification.png';

import { ComingSoonPopUp } from '../components';

export const ChangeProfilePicComp = ({
	handleGoBack,
	isPopUpVisible,
	setIsPopUpVisible,
	handleClosePopUp,
}) => {
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
					text: 'Customize eBC Profile Picture',
					style: Typography.H6,
				}}
			/>

			<View
				style={{
					flex: 1,
				}}
			>
				<Image resizeMode="contain" source={dummyProfile} style={{ flex: 1, width: '100%' }} />
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
