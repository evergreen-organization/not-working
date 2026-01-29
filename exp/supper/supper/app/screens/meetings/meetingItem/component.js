import React from 'react';
import Moment from 'moment';
import { TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { Reminders } from '../components/reminder';
import { MeetingDetails } from '../components/meetingDetailsItem';
import { MeetingDate } from '../components/MeetingDate';
import { styles } from './styles';
import { Text } from 'atoms';

export const MeetingItemView = ({
	handleSwipeToOpen,
	handleSwipeLeftWillOpen,
	handleSkip,
	handleCloseDateTooltip,
	handlePrevious,
	handleClose,
	onMeetingDatePress,
	onGetMeetingAttendees,
	year,
	eventStartDate,
	index,
	getMarginTop,
	tooltip1,
	swipeableItem,
	event,
	eventEndDate,
	tooltip2,
}) => {
	return (
		<>
			{/*Show year title at every beginning of the year*/}
			{year && (
				<View style={styles.yearContainer}>
					<Text bold style={styles.yearText}>
						{Moment(eventStartDate).year()}
					</Text>
				</View>
			)}
			<View
				testID={`meeting-item-${index}`}
				style={[styles.meetingContainer, { marginTop: getMarginTop }]}
			>
				<TouchableOpacity
					style={styles.meetingDate}
					activeOpacity={0.5}
					onPress={onMeetingDatePress}
				>
					<MeetingDate
						tooltipVisible={index === 0 && tooltip1}
						placement="right"
						onSkipPress={handleSkip}
						onNextPress={handleCloseDateTooltip}
						onClose={handleCloseDateTooltip}
						date={eventStartDate}
					/>
				</TouchableOpacity>
				<View testID={`meeting-swipeable-item-${index}`} style={styles.meetingDetails}>
					<Swipeable
						ref={(item) => (swipeableItem[index] = item)}
						friction={1}
						leftThreshold={80}
						rightThreshold={0}
						onSwipeableOpen={handleSwipeToOpen}
						onSwipeableWillOpen={() => handleSwipeLeftWillOpen(swipeableItem[index])}
						renderLeftActions={(dragX) => (
							<Reminders
								testID={`meeting-reminder-button-${index}`}
								event={event}
								eventStartDate={eventStartDate}
								eventEndDate={eventEndDate}
								onReminderSet={() => handleSwipeLeftWillOpen()}
								dragX={dragX}
							/>
						)}
					>
						<TouchableOpacity
							testID={'meeting-details-button'}
							activeOpacity={0.8}
							onPress={onGetMeetingAttendees}
						>
							<MeetingDetails
								event={event}
								eventStartDate={eventStartDate}
								eventEndDate={eventEndDate}
								tooltipVisible={index === 0 && tooltip2}
								onGetMeetingAttendees={onGetMeetingAttendees}
								onPressPrevious={handlePrevious}
								onClose={handleClose}
							/>
						</TouchableOpacity>
					</Swipeable>
				</View>
			</View>
		</>
	);
};
