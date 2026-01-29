import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { Loading, Screen, Space, Text } from 'atoms';
import { ButtonBottom, Header } from 'molecules';
import { Typography } from 'styles';

import { styles } from './styles';

export const NotificationNewPreviewView = ({
	handleBack,
	handleSendNotification,
	handleDiscardCreateNewNotification,
	categoryImage,
	categoryName,
	validDuration,
	companyName,
	title,
	body,
	description,
	loading,
}) => {
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
					text: 'Preview',
					style: Typography.H6,
				}}
			/>
			<View style={styles.flex}>
				<ScrollView alwaysBounceVertical={true}>
					<View style={styles.content}>
						<View style={styles.iconContainer}>
							<Image source={{ uri: `${categoryImage}` }} style={styles.icon} />
						</View>
						<View style={{ flexDirection: 'row', marginBottom: 10 }}>
							<View style={styles.leftContainer}>
								<Text variant={'P6'} style={styles.heading}>
									Type
								</Text>
								<Text variant={'P6'} style={styles.body}>
									{categoryName}
								</Text>
							</View>
							<View style={styles.rightContainer}>
								<Text variant={'P6'} style={styles.heading}>
									Valid Until
								</Text>
								<Text variant={'P6'} style={styles.body}>
									{validDuration}
								</Text>
							</View>
						</View>
						<View>
							<Text variant={'P6'} style={styles.heading}>
								To
							</Text>
							<Text variant={'P6'} style={styles.body}>
								{companyName}
							</Text>
						</View>
						<Space height={12} />
						<View style={styles.divider} />
						<Space height={12} />
						<Text variant={'P7'} style={styles.title}>
							{title}
						</Text>
						<Text variant={'P6'} style={styles.body}>
							{body}
						</Text>
						<Text variant={'P6'} style={styles.description}>
							{description}
						</Text>
					</View>
				</ScrollView>
				<View style={styles.buttonRowContainer}>
					<View style={styles.buttonContainer}>
						<ButtonBottom style={styles.discardButton} onPress={handleDiscardCreateNewNotification}>
							Discard
						</ButtonBottom>
					</View>
					<View style={styles.buttonContainer}>
						<ButtonBottom style={styles.sendButton} onPress={handleSendNotification}>
							Send
						</ButtonBottom>
					</View>
				</View>
				{loading && <Loading />}
			</View>
		</Screen>
	);
};
