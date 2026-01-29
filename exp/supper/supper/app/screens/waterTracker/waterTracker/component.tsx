import React from 'react';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import Moment from 'moment/moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { PrimaryButton, Screen, Text } from 'atoms';
import _drinking from 'assets/icon/drinking.png';
import _drink from 'assets/icon/drink.png';
import { WaterTrackerForm } from '../waterTrackerForm';
import { styles } from './styles';
import { timeFormat } from '../utils';
import { WaterTrackerViewType } from '../waterTracker.type';
import WaterIntakeProgress from '../components/WaterIntakeProgress';
import { ButtonWithImage, Header } from 'molecules';

const waterVolume = [
	{ title: '100 ml', waterIntakeVolume: 100, imageSize: 30 },
	{ title: '200 ml', waterIntakeVolume: 200, imageSize: 40 },
	{ title: '300 ml', waterIntakeVolume: 300, imageSize: 50 },
];

export const WaterTrackerView = ({
	handleAddWaterIntake,
	handleDrink,
	handleSwitchCup,
	handleDrinkWaterReminder,
	dailyGoal,
	waterIntakeVolume,
	enableReminder,
	timeSchedule,
}: WaterTrackerViewType) => {
	if (!dailyGoal || dailyGoal === 0) {
		return <WaterTrackerForm />;
	}
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Water Tracker',
				}}
				rightComponent={
					<TouchableOpacity style={styles.headerIconContainer} onPress={handleAddWaterIntake}>
						<Entypo name="plus" style={styles.headerIcon} />
					</TouchableOpacity>
				}
			/>

			<ScrollView>
				<View style={styles.content}>
					<View style={styles.progressContainer}>
						<WaterIntakeProgress />
						<PrimaryButton
							style={styles.drinkButtonWrapper}
							buttonStyle={styles.drinkButton}
							shadowColor="#00224B"
							onPress={handleDrink}
							leftIcon={_drinking}
							iconStyle={styles.drinkButtonImage}
							title="Drink"
							isTitleBold
							shadowStyle={styles.drinkButtonShadow}
						/>
					</View>
					<View style={styles.glassSizeContainer}>
						<Text variant="P7" style={styles.glassSizeText}>
							Glass Size
						</Text>
						<Text style={styles.glassSizeInfoText}>
							When you shake or press 'Drink', water amount as per glass size will be added to your
							total consumed amount.
						</Text>
						<View style={styles.glassSizeButtonContainer}>
							{waterVolume.map((item) => (
								<ButtonWithImage
									key={item.waterIntakeVolume}
									bold={false}
									title={item.title}
									image={_drink}
									onPress={() => handleSwitchCup(item.waterIntakeVolume)}
									style={
										waterIntakeVolume === item.waterIntakeVolume
											? styles.glassSizeButtonSelected
											: styles.glassSizeButton
									}
									imageStyle={{
										width: item.imageSize,
										height: item.imageSize,
									}}
									textStyle={styles.glassSizeText}
								/>
							))}
						</View>
					</View>
					<View style={styles.reminderContent}>
						<View style={styles.reminderContainer}>
							<Text bold style={styles.reminderText}>
								Reminder
							</Text>
							<Switch
								onValueChange={(value) => handleDrinkWaterReminder(value)}
								value={enableReminder}
							/>
						</View>
						<View style={styles.scheduleContainer}>
							{enableReminder ? (
								<View style={styles.schedule}>
									{timeSchedule.map((time) => (
										<Text bold key={time} style={styles.timeSchedule}>
											{Moment(time).format(timeFormat)}
										</Text>
									))}
								</View>
							) : (
								<Text style={styles.reminderOffText}>Reminder is off</Text>
							)}
						</View>
						<Text style={styles.footerText}>
							Water is the best natural remedy. Drink your way to better health.
						</Text>
					</View>
				</View>
			</ScrollView>
		</Screen>
	);
};
