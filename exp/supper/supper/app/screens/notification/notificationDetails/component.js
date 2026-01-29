import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import { Loading, Screen, Text } from 'atoms';
import { PdfModal } from 'organisms';
import { Header } from 'molecules';
import { colors } from 'configs';
import { Typography } from 'styles';
import DocumentIcon from 'assets/icon/document.png';

import { NotificationWebView } from '../components';
import { styles } from './styles';

export const NotificationDetailsView = ({
	handleOpenUrl,
	handleLeadGenDetailPress,
	handleClosePdfModal,
	handleOpenPdfModal,
	handleBack,
	isModalVisible,
	source,
	isLeadGen,
	notificationDetails,
	loading,
}) => {
	const { imageUrl, title, body, description, attachments, createdBy } = notificationDetails;
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleBack,
				}}
				centerComponent={{
					text: 'Details',
					style: Typography.H6,
				}}
			/>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				{imageUrl !== '' && (
					<Image source={{ uri: `${imageUrl}` }} style={styles.notificationImage} />
				)}
				<Text variant={'H6'} style={styles.title}>
					{title}
				</Text>
				<Text variant={'P6'} style={styles.heading}>
					{body}
				</Text>
				{isLeadGen ? (
					<>
						<NotificationWebView html={description} />
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={() => handleLeadGenDetailPress()}>
								<Text variant={'P7'} style={styles.link}>
									Click Here{' '}
								</Text>
							</TouchableOpacity>
							<Text variant={'P6'} style={styles.paragraph}>
								for customer lead details
							</Text>
						</View>
					</>
				) : (
					<Hyperlink linkStyle={{ color: colors.primary }} onPress={handleOpenUrl}>
						<Text variant={'P6'} style={styles.paragraph}>
							{description}
						</Text>
					</Hyperlink>
				)}

				{attachments && attachments.length > 0 && (
					<View style={{ marginVertical: 10 }}>
						<Text variant={'P7'} style={styles.subTopic}>
							Attachment
						</Text>
						<TouchableOpacity activeOpacity={0.5} onPress={() => handleOpenPdfModal(attachments)}>
							<Image source={DocumentIcon} style={styles.icon} />
						</TouchableOpacity>
					</View>
				)}
				{createdBy && (
					<View style={styles.fromContainer}>
						<Text variant={'P6'} style={styles.heading}>
							From:
						</Text>
						<Text variant={'P6'} style={styles.paragraph}>
							{createdBy}
						</Text>
					</View>
				)}
			</ScrollView>
			{loading && <Loading />}
			<PdfModal source={source} isVisible={isModalVisible} closeModal={handleClosePdfModal} />
		</Screen>
	);
};
