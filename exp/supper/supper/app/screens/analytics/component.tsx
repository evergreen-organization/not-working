import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Button, Icon, Screen, Text } from 'atoms';
import { Header } from 'molecules';
import { colors } from 'configs';
import { Typography } from 'styles';

import { styles } from './styles';
import { UserAnalyticsType } from '../../stores/analytics/analytics.type';

interface AnalyticsCompProps {
	currentScreenshotUri?: string;
	aspectRatio: number;
	currentAction?: UserAnalyticsType;
	yCoordinate: number;
	xCoordinate: number;
	handleHeaderBackButton(): void;
	handleClearAllButton(): void;
	handlePreviousButton(): void;
	handleNextButton(): void;
}
export const AnalyticsComp = (props: AnalyticsCompProps) => {
	const {
		currentScreenshotUri,
		aspectRatio,
		currentAction,
		yCoordinate,
		xCoordinate,
		handleHeaderBackButton,
		handleClearAllButton,
		handlePreviousButton,
		handleNextButton,
	} = props;

	return (
		<Screen style={{ backgroundColor: colors.transparent }}>
			{!!currentScreenshotUri && (
				<ImageBackground
					source={{ uri: currentScreenshotUri }}
					style={{
						position: 'absolute',
						width: '100%',
						height: null,
						aspectRatio: aspectRatio,
					}}
					imageStyle={styles.$bgImageStyle}
				/>
			)}
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderBackButton,
				}}
				centerComponent={{
					text: 'Analytics Replay Screen',
					style: Typography.H6,
				}}
				rightComponent={{
					icon: 'delete-forever',
					type: 'material-community',
					onPress: handleClearAllButton,
				}}
			/>
			{!!currentAction && (
				<>
					<View style={{ flexDirection: 'row' }}>
						<Text>
							{currentAction.module} {'->'}{' '}
						</Text>
						<Text>
							{currentAction.screen} {'->'}
						</Text>
						<Text>{currentAction.action}</Text>
					</View>

					<Icon
						name="circle"
						type="entypo"
						style={{
							fontSize: 20,
							position: 'absolute',
							top: yCoordinate,
							left: xCoordinate,
						}}
					/>

					<View style={styles.$bottomContainer}>
						<View style={styles.$bottomItemsContainer}>
							<Button title="Previous" onPress={handlePreviousButton} />
							<Button title="Next" onPress={handleNextButton} />
						</View>
					</View>
				</>
			)}
		</Screen>
	);
};
